//
//  GigyaBridge.m
//  ReactPoc
//
//  Created by Greenberg, Matthew on 1/10/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "GigyaBridge.h"
#import <GigyaSDK/Gigya.h>
#import <React/RCTLog.h>

@implementation GigyaBridge

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(login:(NSString *)loginId password:(NSString *)password callback:(RCTResponseSenderBlock)callback) {
  
  GSRequest *request = [GSRequest requestForMethod:@"accounts.login"];
  [request.parameters setObject:loginId forKey:@"loginID"];
  [request.parameters setObject:password forKey:@"password"];
  
  [request sendWithResponseHandler:^(GSResponse *response, NSError *error) {
    if (!error) {
      callback(@[@"Ok"]);
    } else {
      callback(@[@"Bad"]);
    }
  }];
  
}

@end
