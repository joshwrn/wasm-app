use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add() -> i32 {
    let mut cur = 0;
    for _ in 0..2000000 {
        // Do nothing
        cur += 1;
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
