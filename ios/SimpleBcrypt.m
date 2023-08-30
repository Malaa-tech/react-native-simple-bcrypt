#import <React/RCTBridgeModule.h>
#import <React/RCTConvert.h>

@interface RCT_EXTERN_MODULE(SimpleBcrypt, NSObject)

RCT_EXTERN_METHOD(compare:(NSString *)plainText hashed:(NSString *)hashed resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter)

RCT_EXTERN_METHOD(hash:(NSString *)plainText rounds:(NSInteger)rounds resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
