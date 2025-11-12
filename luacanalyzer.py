import os
import argparse
import struct

def analyze_lua_header_correct(filename):
    """Корректный анализ стандартного заголовка Lua 5.3"""
    if not os.path.isfile(filename):
        print(f"Ошибка: файл '{filename}' не найден")
        return False
    
    try:
        with open(filename, 'rb') as f:
            # Читаем полный заголовок (первые 18+ байт)
            data = f.read(50)
            
            print(f"Провожу анализ: {filename}")
            print("=" * 50)

            print("Заголовок:")
            print(data)

            print("Заголовок HEX:")
            print(data.hex())
            
            # Основная сигнатура (первые 5 байт)
            signature = data[0:5]
            print(f"Сигнатура: {signature.hex()}")
            print(f"  ESC Lua {chr(signature[4])} -> Lua 5.3")
            
            # LUAC_DATA (6 байт)
            luac_data = data[5:11]
            print(f"LUAC_DATA: {luac_data.hex()}")
            print(f"  Стандартные проверочные байты: {luac_data == b'\x00\x19\x93\x0d\x0a\x1a'}")
            
            # Размеры типов (5 байт)
            type_sizes = data[12:17]
            if len(type_sizes) >= 5:
                int_size = type_sizes[0]
                size_t_size = type_sizes[1]
                instruction_size = type_sizes[2]
                lua_integer_size = type_sizes[3]
                lua_number_size = type_sizes[4]
                
                print(f"Размеры типов: {type_sizes.hex()}")
                print(f"  int: {int_size} байт")
                print(f"  size_t: {size_t_size} байт ({'32-битная сборка' if size_t_size == 4 else '64-битная'})")
                print(f"  Instruction: {instruction_size} байт")
                print(f"  lua_Integer: {lua_integer_size} байт")
                print(f"  lua_Number: {lua_number_size} байт")
            
            # LUAC_INT (8 байт)
            if len(data) >= 24:
                luac_int = data[17:25]
                int_value = struct.unpack('<Q', luac_int)[0]  # Little-endian
                print(f"LUAC_INT: {luac_int.hex()} = {int_value} (0x{int_value:X})")
                print(f"  Проверка: {'✅ Совпадает с 0x5678' if int_value == 0x5678 else '❌ Не совпадает'}")
            
            # LUAC_NUM (8 байт)
            if len(data) >= 32:
                luac_num = data[24:32]
                num_value = struct.unpack('<d', luac_num)[0]  # Double
                print(f"LUAC_NUM: {luac_num.hex()} = {num_value}")
                print(f"  Проверка: {'✅ Совпадает с 370.5' if num_value == 370.5 else '❌ Не совпадает'}")
            
            # Общая информация
            print(f"\nОбщая информация:")
            file_size = os.path.getsize(filename)
            print(f"Размер файла: {file_size} байт")
            
            # Проверка валидности
            is_valid = (
                signature[:4] == b'\x1bLua' and
                signature[4] == 0x53 and  # Lua 5.3
                luac_data == b'\x00\x19\x93\x0d\x0a\x1a'
            )
            
            if is_valid:
                print("✅ Файл имеет ВАЛИДНЫЙ заголовок Lua 5.3")
            else:
                print("❌ Заголовок не соответствует стандарту Lua 5.3")
            
            return True
            
    except Exception as e:
        print(f"Ошибка при анализе файла: {e}")
        return False

def compare_compiled_files(file1, file2):
    """Сравнивает два скомпилированных Lua файла"""
    print(f"\nСравнение файлов:")
    print(f"Файл 1: {file1}")
    print(f"Файл 2: {file2}")
    print("=" * 50)
    
    # Сравниваем размеры
    size1 = os.path.getsize(file1)
    size2 = os.path.getsize(file2)
    
    print(f"Размер файла 1: {size1} байт")
    print(f"Размер файла 2: {size2} байт")
    print(f"Разница: {abs(size1 - size2)} байт")
    
    # Сравниваем содержимое
    with open(file1, 'rb') as f1, open(file2, 'rb') as f2:
        content1 = f1.read()
        content2 = f2.read()
    
    # Ищем различия в байт-коде (после заголовка)
    header_size = 32  # Стандартный размер заголовка
    
    if len(content1) > header_size and len(content2) > header_size:
        bytecode1 = content1[header_size:]
        bytecode2 = content2[header_size:]
        
        # Простое сравнение размеров байт-кода
        print(f"Байт-код файла 1: {len(bytecode1)} байт")
        print(f"Байт-код файла 2: {len(bytecode2)} байт")
        
        # Считаем различия
        min_len = min(len(bytecode1), len(bytecode2))
        differences = sum(1 for i in range(min_len) if bytecode1[i] != bytecode2[i])
        print(f"Различий в байт-коде: {differences} байт")
        
        if differences == 0 and len(bytecode1) == len(bytecode2):
            print("✅ Байт-код идентичен")
        else:
            print("❌ Байт-код различается")

def main():
    parser = argparse.ArgumentParser(
        prog='LuaHeaderAnalyzerCorrect',
        description='Корректный анализ заголовков Lua 5.3 файлов'
    )
    parser.add_argument('filename', help='Путь к .lua файлу для анализа')
    parser.add_argument('--compare', help='Второй файл для сравнения')
    
    args = parser.parse_args()
    
    if args.filename:
        analyze_lua_header_correct(args.filename)
        
        if args.compare:
            compare_compiled_files(args.filename, args.compare)

if __name__ == '__main__':
    main()