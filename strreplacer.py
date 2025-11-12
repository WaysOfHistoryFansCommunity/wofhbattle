import os
import argparse

def strs_replace(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = f.read()
            
            data = data.replace("\\00", "\n")

            if(data):
                with open('new'+file_path, "w", encoding="utf-8") as f:
                    f.write(data)
            else:
                print(f"Ошибка нахождения \\00 в файле")
    except Exception as e:
        print(f"Ошибка чтения файла: {e}")
        return None

def main():
    parser = argparse.ArgumentParser(description='Заменяет \\00 в файле на переносы строк')
    parser.add_argument('file', help='Путь к файлу')
    
    args = parser.parse_args()
    
    if not os.path.isfile(args.file):
        print(f"Файл не найден: {args.file}")
        return

    strs_replace(args.file)

if __name__ == '__main__':
    main()