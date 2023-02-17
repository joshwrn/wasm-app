use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(left: i32, right: i32) -> i32 {
    let mut cur = 0;
    // 1 billion
    for _ in 0..1000000000 {
        cur += left + right;
    }
    cur
}

// #[cfg(test)]
// mod tests {
//     use super::*;

//     #[test]
//     fn it_works() {
//         let result = add(2, 2);
//         assert_eq!(result.total, 4);
//     }
// }
