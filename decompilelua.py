import os
import subprocess
import sys
from pathlib import Path

def decompile_lua_files(input_dir, output_dir, unluac_jar_path):
    """
    Рекурсивно декомпилирует все Lua-файлы в папке и ее подпапках
    """
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    
    # Создаем выходную директорию если не существует
    output_path.mkdir(parents=True, exist_ok=True)
    
    # Счетчики для статистики
    processed_files = 0
    skipped_files = 0
    error_files = 0
    
    # Проходим по всем файлам рекурсивно
    for lua_file in input_path.rglob('*'):
        if lua_file.is_file():
            try:
                # Проверяем, является ли файл Lua-файлом (по содержимому или расширению)
                if is_compiled_lua_file(lua_file):
                    # Создаем соответствующий путь в выходной директории
                    relative_path = lua_file.relative_to(input_path)
                    output_file = output_path / relative_path
                    
                    # Создаем директории если нужно
                    output_file.parent.mkdir(parents=True, exist_ok=True)
                    
                    # Декомпилируем файл
                    if decompile_single_file(lua_file, output_file, unluac_jar_path):
                        print(f"✓ Успешно: {relative_path}")
                        processed_files += 1
                    else:
                        print(f"✗ Ошибка: {relative_path}")
                        error_files += 1
                else:
                    skipped_files += 1
                    
            except Exception as e:
                print(f"✗ Ошибка обработки {lua_file}: {e}")
                error_files += 1
    
    # Выводим статистику
    print(f"\n=== Статистика ===")
    print(f"Обработано: {processed_files}")
    print(f"Пропущено: {skipped_files}")
    print(f"Ошибок: {error_files}")

def is_compiled_lua_file(file_path):
    """
    Проверяет, является ли файл скомпилированным Lua-файлом
    по сигнатуре в заголовке
    """
    try:
        with open(file_path, 'rb') as f:
            header = f.read(4)  # Читаем первые 4 байта
            # Проверяем сигнатуру Lua (1B 4C 75 61)
            return header == b'\x1bLua'
    except:
        return False

def decompile_single_file(input_file, output_file, unluac_jar_path):
    """
    Декомпилирует один Lua-файл с помощью unluac
    """
    try:
        # Команда для декомпиляции
        cmd = [
            'java', '-jar', 
            str(unluac_jar_path), 
            str(input_file)
        ]
        
        # Выполняем команду и получаем вывод
        result = subprocess.run(
            cmd, 
            capture_output=True, 
            text=True, 
            check=True
        )
        
        # Сохраняем результат в файл
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(result.stdout)
        
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"Ошибка декомпиляции {input_file}:")
        print(f"STDERR: {e.stderr}")
        return False
    except Exception as e:
        print(f"Неожиданная ошибка с {input_file}: {e}")
        return False

def main():
    INPUT_DIRECTORY = "scripts"
    OUTPUT_DIRECTORY = "scriptsDecompiled"
    UNLUAC_JAR = "unluac.jar"
    
    if not os.path.exists(UNLUAC_JAR):
        print(f"Ошибка: файл {UNLUAC_JAR} не найден!")
        print("Скачайте unluac.jar и положите в ту же папку что и скрипт")
        return
    
    if not os.path.exists(INPUT_DIRECTORY):
        print(f"Ошибка: входная директория {INPUT_DIRECTORY} не существует!")
        return
    
    print("Начинаем декомпиляцию Lua-файлов...")
    print(f"Входная папка: {INPUT_DIRECTORY}")
    print(f"Выходная папка: {OUTPUT_DIRECTORY}")
    print(f"Unluac: {UNLUAC_JAR}")
    print("-" * 50)
    
    # Запускаем декомпиляцию
    decompile_lua_files(INPUT_DIRECTORY, OUTPUT_DIRECTORY, UNLUAC_JAR)

if __name__ == "__main__":
    main()