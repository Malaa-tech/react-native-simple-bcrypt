//
//  BcryptModule.swift
//  NativeBcrypt
//
//  Created by Wadah Esam on 29/08/2023.
//

import Foundation
import BCrypt

@objc(SimpleBcrypt)
class SimpleBcrypt: NSObject {
  @objc
    func hash(_ plainText: String, rounds: Int, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        print("Hashing")
        do {
          let salt = try BCrypt.Salt(rounds: rounds)
          let result = try BCrypt.Hash(plainText, salt: BCrypt.Salt())
          resolver(result)
        } catch {
//            rejecter("error", "error while hashing")
        }
    }
    
  @objc
  func compare(_ plainText: String, hashed: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
      let result = BCrypt.Check(plainText, hashed: hashed)
      resolver(result)
  }
}
