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
    /// Hashes a plaintext string using bcrypt.
    /// - Parameters:
    ///   - plainText: The string to be hashed.
    ///   - rounds: The cost factor for the bcrypt algorithm.
    ///   - resolver: Promise resolve block.
    ///   - rejecter: Promise reject block.
    @objc
    func hash(_ plainText: String, rounds: Int, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        do {
            let salt = try BCrypt.Salt(rounds: rounds)
            let result = try BCrypt.Hash(plainText, salt: salt)
            resolver(result)
        } catch {
            rejecter("error", "error while hashing", error)
        }
    }
    
    /// Compares a plaintext and a hashed string.
    /// - Parameters:
    ///   - plainText: The plaintext string.
    ///   - hashed: The hashed string.
    ///   - resolver: Promise resolve block.
    ///   - rejecter: Promise reject block.
    @objc
    func compare(_ plainText: String, hashed: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        let result = BCrypt.Check(plainText, hashed: hashed)
        resolver(result)
    }
}
