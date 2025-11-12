import os
import argparse
import struct

def deep_analyze_lua(filename):
    """Глубокий анализ Lua файлов с кастомными заголовками"""
    if not os.path.isfile(filename):
        print(f"Ошибка: файл '{filename}' не найден")
        return False
    
    try:
        with open(filename, 'rb') as f:
            data = f.read(1000)  # Читаем первые 1000 байт для анализа
            
            print(f"Глубокий анализ: {filename}")
            print("=" * 60)
            
            # Анализ заголовка
            header = data[:12]
            print(f"Заголовок: {header.hex()}")
            print(f"Сигнатура: {header[:4].hex()} -> ESC Lua {chr(header[4])}")
            print(f"Заявленная версия: 5.{header[4] - 0x30}")
            
            # Проверяем, является ли файл текстовым с заголовком
            is_likely_text = analyze_text_content(data[12:])
            
            if is_likely_text:
                print("\n📝 Файл вероятно является ИСХОДНЫМ КОДОМ с добавленным заголовком")
                print("Попытка извлечь исходный код...")
                extract_source_code(data[12:], filename + ".extracted.lua")
            else:
                print("\n🔒 Файл вероятно является ОБФУСЦИРОВАННЫМ байт-кодом")
                analyze_bytecode_patterns(data)
            
            # Анализ структуры файла
            analyze_file_structure(data, filename)
            
            return True
            
    except Exception as e:
        print(f"Ошибка при анализе файла: {e}")
        return False

def analyze_text_content(data):
    """Анализирует, является ли содержимое текстовым"""
    text_chars = 0
    total_chars = min(100, len(data))
    
    for i in range(total_chars):
        if 32 <= data[i] <= 126 or data[i] in [9, 10, 13]:  # Печатные символы + табуляция, переносы
            text_chars += 1
    
    text_ratio = text_chars / total_chars
    return text_ratio > 0.8  # Если более 80% текстовых символов

def extract_source_code(data, output_filename):
    """Пытается извлечь исходный код из данных"""
    try:
        # Пробуем разные кодировки
        for encoding in ['utf-8', 'latin-1', 'cp1251']:
            try:
                text = data.decode(encoding)
                # Проверяем на наличие ключевых слов Lua
                lua_keywords = ['function', 'local', 'if', 'then', 'end', 'return']
                keyword_count = sum(1 for keyword in lua_keywords if keyword in text.lower())
                
                if keyword_count >= 2:  # Если нашли хотя бы 2 ключевых слова
                    with open(output_filename, 'w', encoding=encoding) as f:
                        f.write(text)
                    print(f"✅ Исходный код извлечен в: {output_filename} (кодировка: {encoding})")
                    print("Первые 200 символов:")
                    print("-" * 40)
                    print(text[:200])
                    print("-" * 40)
                    return True
            except UnicodeDecodeError:
                continue
        
        print("❌ Не удалось извлечь читаемый исходный код")
        return False
        
    except Exception as e:
        print(f"Ошибка при извлечении кода: {e}")
        return False

def analyze_bytecode_patterns(data):
    """Анализирует паттерны байт-кода"""
    print("Поиск паттернов байт-кода Lua...")
    
    # Ищем стандартные opcodes Lua
    lua_opcodes = [
        0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09,
        0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13,
        0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D,
        0x1E, 0x1F, 0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27
    ]
    
    opcode_count = sum(1 for byte in data[:200] if byte in lua_opcodes)
    print(f"Найдено возможных opcodes в первых 200 байтах: {opcode_count}")
    
    if opcode_count > 10:
        print("✅ Высокая вероятность что это байт-код")
    else:
        print("❌ Мало opcodes - возможно это не байт-код")

def analyze_file_structure(data, filename):
    """Анализирует общую структуру файла"""
    file_size = os.path.getsize(filename)
    print(f"\n📊 Структура файла:")
    print(f"Размер файла: {file_size} байт")
    print(f"Размер заголовка: 12 байт")
    print(f"Размер содержимого: {file_size - 12} байт")
    
    # Ищем возможные секции
    strings = extract_strings(data)
    print(f"Найдено строк: {len(strings)}")
    
    if strings:
        print("Топ-10 строк:")
        for i, s in enumerate(strings[:10]):
            print(f"  {i+1:2d}. '{s}'")

def extract_strings(data, min_length=4):
    """Извлекает строки из данных"""
    strings = []
    current_string = ""
    
    for byte in data:
        if 32 <= byte <= 126:  # Печатные ASCII символы
            current_string += chr(byte)
        else:
            if len(current_string) >= min_length:
                strings.append(current_string)
            current_string = ""
    
    if len(current_string) >= min_length:
        strings.append(current_string)
    
    return strings

def main():
    parser = argparse.ArgumentParser(
        prog='LuaDeepAnalyzer',
        description='Глубокий анализ Lua файлов с кастомными заголовками',
        epilog='Пример: python lua_deep_analyze.py file.lua'
    )
    parser.add_argument('filename', help='Путь к .lua файлу для анализа')
    
    args = parser.parse_args()
    
    if args.filename:
        deep_analyze_lua(args.filename)
    else:
        print("Ошибка: укажите файл для анализа")

if __name__ == '__main__':
    main()