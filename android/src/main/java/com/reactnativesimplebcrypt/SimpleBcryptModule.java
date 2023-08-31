package com.reactnativesimplebcrypt;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import org.mindrot.jbcrypt.BCrypt;

@ReactModule(name = SimpleBcryptModule.NAME)
public class SimpleBcryptModule extends ReactContextBaseJavaModule {
    public static final String NAME = "SimpleBcrypt";

    public SimpleBcryptModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    /**
     * Hashes a plaintext string using bcrypt.
     *
     * @param plainText The string to be hashed.
     * @param rounds    The cost factor for the bcrypt algorithm.
     * @param promise   Promise resolve/reject block.
     */
    @ReactMethod
    public void hash(String plainText, int rounds, Promise promise) {
        // Validate input
        if (plainText == null || plainText.isEmpty()) {
            promise.reject("Error", "Plaintext should not be empty");
            return;
        }

        if (rounds < 4 || rounds > 30) {
            promise.reject("Error", "Invalid number of rounds, should be between 4 and 30");
            return;
        }

        try {
            String hashed = BCrypt.hashpw(plainText, BCrypt.gensalt(rounds));
            promise.resolve(hashed);
        } catch (Exception e) {
            promise.reject("An error occurred while hashing", e);
        }
    }

    /**
     * Compares a plaintext and a hashed string.
     *
     * @param plainText The plaintext string.
     * @param hashed    The hashed string.
     * @param promise   Promise resolve/reject block.
     */
    @ReactMethod
    public void compare(String plainText, String hashed, Promise promise) {
        // Validate input
        if (plainText == null || plainText.isEmpty() || hashed == null || hashed.isEmpty()) {
            promise.reject("Error", "Plaintext or hashed text should not be empty");
            return;
        }

        try {
            boolean result = BCrypt.checkpw(plainText, hashed);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("Error in comparison", e);
        }
    }

}
