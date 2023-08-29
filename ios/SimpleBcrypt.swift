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
  func compare(_ plainText: String, hashed: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
      let result = BCrypt.Check(plainText, hashed: hashed)
      resolver(result)
  }
}
