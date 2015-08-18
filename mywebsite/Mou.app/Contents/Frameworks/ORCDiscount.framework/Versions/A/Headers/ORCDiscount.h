
#import <Cocoa/Cocoa.h>

@interface ORCDiscount : NSObject {
}

+ (NSString *)markdown2HTML:(NSString *)markdown;
+ (NSString *)HTMLPage:(NSString *)markdownHTML withCSSHTML:(NSString *)cssHTML;
+ (NSString *)HTMLPage:(NSString *)markdownHTML withCSSFromURL:(NSURL *)cssURL;
+ (NSURL *)cssURL;

+ (NSString *)HTMLPage:(NSString *)markdownHTML withCSSFromPath:(NSString *)cssPath;

// with MathJax
+ (NSString *)HTMLPageMathJax:(NSString *)markdownHTML withCSSHTML:(NSString *)cssHTML;
+ (NSString *)HTMLPageMathJax:(NSString *)markdownHTML withCSSFromPath:(NSString *)cssPath;


@end
