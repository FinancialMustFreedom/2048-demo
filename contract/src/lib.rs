use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{near_bindgen, AccountId, Promise};

const DROP_AMOUNT: u128 = 1_000_000_000_000_000_000_000_000; // 10near

near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Drop {}

impl Default for Drop {
    fn default() -> Self {
        Self {}
    }
}

#[near_bindgen]
impl Drop {
    pub fn drop_transfer(&mut self, account_id: AccountId) {
        Promise::new(account_id).transfer(DROP_AMOUNT);
    }
}
