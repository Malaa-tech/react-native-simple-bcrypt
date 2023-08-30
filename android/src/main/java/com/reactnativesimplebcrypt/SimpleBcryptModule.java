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

    @ReactMethod
    public void hash(String plainText, int rounds, Promise promise) {
        try {
            String hashed = BCrypt.hashpw(plainText, BCrypt.gensalt(rounds));

            promise.resolve(hashed);
        } catch (Exception e) {
            promise.reject("Error in hashing", e);
        }
    }


    @ReactMethod
    public void compare(String plainText, String hashed, Promise promise) {
        try {
            boolean result = BCrypt.checkpw(plainText, hashed);

            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("Error in comparison", e);
        }
    }

}
