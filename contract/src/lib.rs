use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{near_bindgen, AccountId, Promise,env};

const DROP_AMOUNT: u128 = 1_000_000_000_000_000_000_000_000; // 10near
const LOCK_AMOUNT: u128 = 1_000_000_000_000_000_000_000_0; // 0.1near

near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Drop {}

//1、设计一个时间段，该时间段内用户得分最高的获取全部奖励
//2、用户进入游戏需要质押0.1个near
//3、奖励发放之后时间重置
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]

pub struct Locked{
    account:AccountId,
    amount :u128,
    time_stamp:u8
}

impl Locked {
    pub fn get_lock_near(self)->u128{
        self.amount
    }
    pub fn lock_near(mut self)->Self{
        let account_id  = env::signer_account_id();
        let balance = env::account_balance();
        if balance <= LOCK_AMOUNT{
            self
        }else{
            self.amount +=  LOCK_AMOUNT;
            self
        }
    }
}
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
