import zlib
import argparse
import os

def calculate_crc(file_path):
    """
    Вычисляет CRC32 для файла
    """
    try:
        with open(file_path, 'rb') as f:
            data = f.read()
            crc = zlib.crc32(data) & 0xffffffff  # Беззнаковое 32-битное число
            return crc
    except Exception as e:
        print(f"Ошибка чтения файла: {e}")
        return None

def main():
    parser = argparse.ArgumentParser(description='Вычисляет CRC32 файла')
    parser.add_argument('file', help='Путь к файлу')
    
    args = parser.parse_args()
    
    if not os.path.isfile(args.file):
        print(f"Файл не найден: {args.file}")
        return
    
    crc = calculate_crc(args.file)
    if crc is not None:
        print(f"Файл: {args.file}")
        print(f"CRC32 (dec): {crc}")
        print(f"CRC32 (hex): 0x{crc:08X}")
        print(f"CRC32 (unsigned): {crc}")
    else:
        print("Не удалось вычислить CRC")

if __name__ == '__main__':
    main()