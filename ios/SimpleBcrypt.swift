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
        // Validate input
        guard !plainText.isEmpty else {
            rejecter("error", "Plaintext should not be empty", nil)
            return
        }
        
        guard rounds >= 4 && rounds <= 30 else {
            rejecter("error", "Invalid number of rounds, should be between 4 and 30", nil)
            return
        }
        
        do {
            let salt = try BCrypt.Salt(rounds: rounds)
            let result = try BCrypt.Hash(plainText, salt: salt)
            resolver(result)
        } catch {
            rejecter("error", "An error occurred while hashing", error)
        }
    }
    
    ///  Compares a plaintext and a hashed string.
    /// -  Parameters:
    ///   -  plainText: The plaintext string.
    ///   -  hashed: The hashed string.
    ///   -  resolver: Promise resolve block.
    ///   -  rejecter: Promise reject block.
    @objc
    func compare(_ plainText: String, hashed: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        // Validate input
        guard !plainText.isEmpty, !hashed.isEmpty else {
            rejecter("error", "Plaintext or hashed text should not be empty", nil)
            return
        }
        
        let isMatching = BCrypt.Check(plainText, hashed: hashed)
        
        resolver(isMatching)
    }
}
