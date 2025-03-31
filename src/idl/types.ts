export type Candy = {
  "version": "0.1.0",
  "name": "candy",
  "instructions": [
    {
      "name": "createMint",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This account is used to store the metadata of the mint",
            "seeds =  ['metadata', program id, mint]",
            "['metadata', program id, mint]"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "liquidityAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cashier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "metadata",
          "type": {
            "defined": "InitTokenParams"
          }
        }
      ]
    },
    {
      "name": "swap",
      "accounts": [
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cfg",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "liquidityAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "mintTokenOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccountOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccountOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysFeeReceiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "devFeeReceiver",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "swapAdmin",
          "isMut": true,
          "isSigner": true,
          "isOptional": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SwapParams"
          }
        }
      ]
    },
    {
      "name": "mintInitialize",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cfg",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "devFeeReciever",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "InitializeParams"
          }
        }
      ]
    },
    {
      "name": "ammPrepare",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "cashier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "target",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "targetTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "liquidityAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccountOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setActive",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "ActiveParams"
          }
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "cashier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dst",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "WithdrawParams"
          }
        }
      ]
    },
    {
      "name": "setCfg",
      "accounts": [
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cfg",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SetCfgParams"
          }
        }
      ]
    },
    {
      "name": "setCurveCfg",
      "accounts": [
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SetCurveCfgParams"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "curveConfiguration",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mintFees",
            "type": "u64"
          },
          {
            "name": "sysFeeReceiver",
            "type": "publicKey"
          },
          {
            "name": "swapDevFee",
            "type": "u64"
          },
          {
            "name": "swapSystemFee",
            "type": "u64"
          },
          {
            "name": "swapAdmin",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "admin",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "liquidityPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenOne",
            "type": "publicKey"
          },
          {
            "name": "tokenTwo",
            "type": "publicKey"
          },
          {
            "name": "totalSupply",
            "type": "u64"
          },
          {
            "name": "reserveOne",
            "type": "u64"
          },
          {
            "name": "reserveTwo",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "active",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "tokenCfg",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "swapAdmin",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "developer",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "devFee",
            "type": "u64"
          },
          {
            "name": "sysFee",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ActiveParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "active",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "InitTokenParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "decimals",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "InitializeParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "swapAdmin",
            "type": "publicKey"
          },
          {
            "name": "swapFee",
            "type": "u64"
          },
          {
            "name": "systemFee",
            "type": "u64"
          },
          {
            "name": "admin",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "SetCfgParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "swapAdmin",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "swapFee",
            "type": "u64"
          },
          {
            "name": "developer",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "SetCurveCfgParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "swapAdmin",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "swapFee",
            "type": "u64"
          },
          {
            "name": "systemFee",
            "type": "u64"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "mintFees",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SwapParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "style",
            "type": "u64"
          },
          {
            "name": "minOut",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "WithdrawParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amt",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "LaunchEvent",
      "fields": [
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "ts",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "MintEvent",
      "fields": [
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "payer",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "name",
          "type": "string",
          "index": false
        },
        {
          "name": "symbol",
          "type": "string",
          "index": false
        },
        {
          "name": "uri",
          "type": "string",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        },
        {
          "name": "ts",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "MintProfit",
      "fields": [
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "src",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "dst",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "ts",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "SwapEvent",
      "fields": [
        {
          "name": "amountIn",
          "type": "u64",
          "index": false
        },
        {
          "name": "style",
          "type": "u64",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "amountOut",
          "type": "u64",
          "index": false
        },
        {
          "name": "reserveOne",
          "type": "u64",
          "index": false
        },
        {
          "name": "reserveTwo",
          "type": "u64",
          "index": false
        },
        {
          "name": "blocknumber",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "DuplicateTokenNotAllowed",
      "msg": "Duplicate tokens are not allowed"
    },
    {
      "code": 6001,
      "name": "FailedToAllocateShares",
      "msg": "Failed to allocate shares"
    },
    {
      "code": 6002,
      "name": "FailedToDeallocateShares",
      "msg": "Failed to deallocate shares"
    },
    {
      "code": 6003,
      "name": "InsufficientShares",
      "msg": "Insufficient shares"
    },
    {
      "code": 6004,
      "name": "InsufficientFunds",
      "msg": "Insufficient funds to swap"
    },
    {
      "code": 6005,
      "name": "InvalidAmount",
      "msg": "Invalid amount to swap"
    },
    {
      "code": 6006,
      "name": "SlippageTooHigh",
      "msg": "Slippage too high"
    },
    {
      "code": 6007,
      "name": "InvalidFee",
      "msg": "Invalid fee"
    },
    {
      "code": 6008,
      "name": "InvalidSwapFee",
      "msg": "Invalid swap fee"
    },
    {
      "code": 6009,
      "name": "FailedToAddLiquidity",
      "msg": "Failed to add liquidity"
    },
    {
      "code": 6010,
      "name": "FailedToRemoveLiquidity",
      "msg": "Failed to remove liquidity"
    },
    {
      "code": 6011,
      "name": "OverflowOrUnderflowOccurred",
      "msg": "Overflow or underflow occured"
    },
    {
      "code": 6012,
      "name": "PriceUnavailable",
      "msg": "Price from Pyth Network is unavailable"
    },
    {
      "code": 6013,
      "name": "InvalidAdmin",
      "msg": "Invalid admin account"
    },
    {
      "code": 6014,
      "name": "InvalidDevFeeReceiver",
      "msg": "Invalid dev fee reciever"
    },
    {
      "code": 6015,
      "name": "InvalidSwapAdmin",
      "msg": "Invalid swap admin account"
    }
  ]
};

export const IDL: Candy = {
  "version": "0.1.0",
  "name": "candy",
  "instructions": [
    {
      "name": "createMint",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This account is used to store the metadata of the mint",
            "seeds =  ['metadata', program id, mint]",
            "['metadata', program id, mint]"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "liquidityAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cashier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "metadata",
          "type": {
            "defined": "InitTokenParams"
          }
        }
      ]
    },
    {
      "name": "swap",
      "accounts": [
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cfg",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "liquidityAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "mintTokenOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccountOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccountOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sysFeeReceiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "devFeeReceiver",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "swapAdmin",
          "isMut": true,
          "isSigner": true,
          "isOptional": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SwapParams"
          }
        }
      ]
    },
    {
      "name": "mintInitialize",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cfg",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "devFeeReciever",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "InitializeParams"
          }
        }
      ]
    },
    {
      "name": "ammPrepare",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "cashier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "target",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "targetTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "liquidityAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccountOne",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setActive",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "ActiveParams"
          }
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "cashier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dst",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "WithdrawParams"
          }
        }
      ]
    },
    {
      "name": "setCfg",
      "accounts": [
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cfg",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SetCfgParams"
          }
        }
      ]
    },
    {
      "name": "setCurveCfg",
      "accounts": [
        {
          "name": "dexConfigurationAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SetCurveCfgParams"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "curveConfiguration",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mintFees",
            "type": "u64"
          },
          {
            "name": "sysFeeReceiver",
            "type": "publicKey"
          },
          {
            "name": "swapDevFee",
            "type": "u64"
          },
          {
            "name": "swapSystemFee",
            "type": "u64"
          },
          {
            "name": "swapAdmin",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "admin",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "liquidityPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenOne",
            "type": "publicKey"
          },
          {
            "name": "tokenTwo",
            "type": "publicKey"
          },
          {
            "name": "totalSupply",
            "type": "u64"
          },
          {
            "name": "reserveOne",
            "type": "u64"
          },
          {
            "name": "reserveTwo",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "active",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "tokenCfg",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "swapAdmin",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "developer",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "devFee",
            "type": "u64"
          },
          {
            "name": "sysFee",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ActiveParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "active",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "InitTokenParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "decimals",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "InitializeParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "swapAdmin",
            "type": "publicKey"
          },
          {
            "name": "swapFee",
            "type": "u64"
          },
          {
            "name": "systemFee",
            "type": "u64"
          },
          {
            "name": "admin",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "SetCfgParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "swapAdmin",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "swapFee",
            "type": "u64"
          },
          {
            "name": "developer",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "SetCurveCfgParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "swapAdmin",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "swapFee",
            "type": "u64"
          },
          {
            "name": "systemFee",
            "type": "u64"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "mintFees",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SwapParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "style",
            "type": "u64"
          },
          {
            "name": "minOut",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "WithdrawParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amt",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "LaunchEvent",
      "fields": [
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "ts",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "MintEvent",
      "fields": [
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "payer",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "name",
          "type": "string",
          "index": false
        },
        {
          "name": "symbol",
          "type": "string",
          "index": false
        },
        {
          "name": "uri",
          "type": "string",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        },
        {
          "name": "ts",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "MintProfit",
      "fields": [
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "src",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "dst",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "ts",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "SwapEvent",
      "fields": [
        {
          "name": "amountIn",
          "type": "u64",
          "index": false
        },
        {
          "name": "style",
          "type": "u64",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "amountOut",
          "type": "u64",
          "index": false
        },
        {
          "name": "reserveOne",
          "type": "u64",
          "index": false
        },
        {
          "name": "reserveTwo",
          "type": "u64",
          "index": false
        },
        {
          "name": "blocknumber",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "DuplicateTokenNotAllowed",
      "msg": "Duplicate tokens are not allowed"
    },
    {
      "code": 6001,
      "name": "FailedToAllocateShares",
      "msg": "Failed to allocate shares"
    },
    {
      "code": 6002,
      "name": "FailedToDeallocateShares",
      "msg": "Failed to deallocate shares"
    },
    {
      "code": 6003,
      "name": "InsufficientShares",
      "msg": "Insufficient shares"
    },
    {
      "code": 6004,
      "name": "InsufficientFunds",
      "msg": "Insufficient funds to swap"
    },
    {
      "code": 6005,
      "name": "InvalidAmount",
      "msg": "Invalid amount to swap"
    },
    {
      "code": 6006,
      "name": "SlippageTooHigh",
      "msg": "Slippage too high"
    },
    {
      "code": 6007,
      "name": "InvalidFee",
      "msg": "Invalid fee"
    },
    {
      "code": 6008,
      "name": "InvalidSwapFee",
      "msg": "Invalid swap fee"
    },
    {
      "code": 6009,
      "name": "FailedToAddLiquidity",
      "msg": "Failed to add liquidity"
    },
    {
      "code": 6010,
      "name": "FailedToRemoveLiquidity",
      "msg": "Failed to remove liquidity"
    },
    {
      "code": 6011,
      "name": "OverflowOrUnderflowOccurred",
      "msg": "Overflow or underflow occured"
    },
    {
      "code": 6012,
      "name": "PriceUnavailable",
      "msg": "Price from Pyth Network is unavailable"
    },
    {
      "code": 6013,
      "name": "InvalidAdmin",
      "msg": "Invalid admin account"
    },
    {
      "code": 6014,
      "name": "InvalidDevFeeReceiver",
      "msg": "Invalid dev fee reciever"
    },
    {
      "code": 6015,
      "name": "InvalidSwapAdmin",
      "msg": "Invalid swap admin account"
    }
  ]
};
