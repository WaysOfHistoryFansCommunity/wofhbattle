import sys, os, zlib, struct
from collections import Counter

# optional libs
try:
    import mmh3
except Exception:
    mmh3 = None
try:
    import xxhash
except Exception:
    xxhash = None
# try google-crc32c under common names
crc32c_fn = None
for modname in ('google_crc32c', 'crc32c', 'google_crc32c.crc32c'):
    try:
        m = __import__(modname)
        # google_crc32c provides crc32c.crc32c, module-level call; crc32c sometimes provides crc32c()
        if hasattr(m, 'crc32c'):
            crc32c_fn = m.crc32c
        elif hasattr(m, 'crc32'):
            crc32c_fn = m.crc32
        else:
            # if google_crc32c imported as package, look for function
            try:
                crc32c_fn = getattr(m, 'crc32c')
            except Exception:
                pass
        if crc32c_fn:
            break
    except Exception:
        pass

def fnv1a_32(data: bytes) -> int:
    h = 0x811c9dc5
    for b in data:
        h ^= b
        h = (h * 0x01000193) & 0xffffffff
    return h

def to_uint32(x):
    return x & 0xffffffff

def test_hashes(target, path):
    results = []
    file_bytes = None
    if os.path.isfile(path):
        with open(path, 'rb') as f:
            file_bytes = f.read()
    else:
        print("Warning: path not found:", path)

    # filename candidates
    filename = os.path.basename(path)
    candidates = [
        filename.encode('utf-8'),
        filename.lower().encode('utf-8'),
        filename.upper().encode('utf-8'),
        b'./' + filename.encode('utf-8'),
        b'scripts/' + filename.encode('utf-8'),
        b'scripts\\' + filename.encode('utf-8'),
        filename.encode('utf-8') + b'\x00',
        path.encode('utf-8'),
    ]
    # unique
    seen = set()
    uniq = []
    for c in candidates:
        if c not in seen:
            uniq.append(c)
            seen.add(c)

    if file_bytes is not None:
        v = to_uint32(zlib.crc32(file_bytes))
        if v == target:
            results.append(('crc32(contents)', hex(v)))
        v = to_uint32(zlib.adler32(file_bytes))
        if v == target:
            results.append(('adler32(contents)', hex(v)))
        v = to_uint32(fnv1a_32(file_bytes))
        if v == target:
            results.append(('fnv1a(contents)', hex(v)))
        if mmh3:
            try:
                v = to_uint32(mmh3.hash(file_bytes))
                if v == target:
                    results.append(('murmur3(contents)', hex(v)))
            except Exception:
                pass
        if xxhash:
            try:
                v = to_uint32(xxhash.xxh32(file_bytes).intdigest())
                if v == target:
                    results.append(('xxhash32(contents)', hex(v)))
            except Exception:
                pass
        if crc32c_fn:
            try:
                v = to_uint32(crc32c_fn(file_bytes))
                if v == target:
                    results.append(('crc32c(contents)', hex(v)))
            except Exception:
                pass

    for c in uniq:
        v = to_uint32(zlib.crc32(c))
        if v == target:
            results.append(('crc32(str)', c.decode('utf-8', errors='replace'), hex(v)))
        v = to_uint32(zlib.adler32(c))
        if v == target:
            results.append(('adler32(str)', c.decode('utf-8', errors='replace'), hex(v)))
        v = to_uint32(fnv1a_32(c))
        if v == target:
            results.append(('fnv1a(str)', c.decode('utf-8', errors='replace'), hex(v)))
        if mmh3:
            try:
                v = to_uint32(mmh3.hash(c))
                if v == target:
                    results.append(('murmur3(str)', c.decode('utf-8', errors='replace'), hex(v)))
            except Exception:
                pass
        if xxhash:
            try:
                v = to_uint32(xxhash.xxh32(c).intdigest())
                if v == target:
                    results.append(('xxhash32(str)', c.decode('utf-8', errors='replace'), hex(v)))
            except Exception:
                pass
        if crc32c_fn:
            try:
                v = to_uint32(crc32c_fn(c))
                if v == target:
                    results.append(('crc32c(str)', c.decode('utf-8', errors='replace'), hex(v)))
            except Exception:
                pass

    return results

def scan_dat_for_uint32(datpath, target):
    """Scan binary file for 4-byte sequences equal to target (both LE and BE)."""
    if not os.path.isfile(datpath):
        return []
    b = open(datpath, 'rb').read()
    res = []
    le = struct.pack('<I', target)
    be = struct.pack('>I', target)
    # find occurrences
    idx = 0
    while True:
        i = b.find(le, idx)