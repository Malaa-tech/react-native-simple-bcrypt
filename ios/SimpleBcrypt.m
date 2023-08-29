#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SimpleBcrypt, NSObject)

RCT_EXTERN_METHOD(compare:(NSString *)plainText hashed:(NSString *)hashed resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
