use tauri::{ Manager, WindowBuilder, WindowUrl };

fn main() 
{
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_new_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn open_new_window(app_handle: tauri::AppHandle, title: String, url: String, id: String) 
{
    let window = WindowBuilder::new(
        &app_handle,
        id,
        WindowUrl::App(url.into())
    )
    .title(title)
    .resizable(true)
    .inner_size(1200.0, 800.0)
    .build()
    .expect("failed to build window");
}