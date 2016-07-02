# Cool zjapp
这一个RN的练习项目，包含了许多功能点以及第三方库的使用，在开发中或多或少会用到，与君共勉。

## 功能

1 自定义封装了类知乎客户端的tabbar，并且伴随滚动逐渐隐藏和显示头部底部功能。

2 实现本地通讯录的交互（用的是`ScrollView`数据多可能会卡顿）

3 拍摄或者选择图片剪切头像（`react-native-image-picker` 有些bug）

4 获取本地图片 实现自定义相册功能（全部获取所有图片，对数其进行分类可以实现分类相册功能）

5 MD设计风格的第三方库（`react-native-material-kit`）

6 这仅仅是练习项目，有问题欢迎`issues`

*另一个开源项目:* [Rank Linking](https://github.com/zhongjie-chen/rn_rank)

## Screenshot Android
<img src="https://github.com/zhongjie-chen/react-native-zjapp/blob/master/screenshot/111.gif?raw=true" width = "260" align=center />
<img src="https://github.com/zhongjie-chen/react-native-zjapp/blob/master/screenshot/222.png?raw=true" width = "260" align=center />
<img src="https://github.com/zhongjie-chen/react-native-zjapp/blob/master/screenshot/333.png?raw=true" width = "260" align=center />
<img src="https://github.com/zhongjie-chen/react-native-zjapp/blob/master/screenshot/4444.jpg?raw=true" width = "260" align=center />
<img src="https://github.com/zhongjie-chen/react-native-zjapp/blob/master/screenshot/555.png?raw=true" width = "260" align=center />

## Dependency
```
"dependencies": {
    "react": "^15.0.2",
    "react-native": "^0.26.2",
    "react-native-camera": "git+https://github.com/lwansbrough/react-native-camera.git",
    "react-native-contacts": "^0.2.6",
    "react-native-image-picker": "^0.19.4",
    "react-native-material-kit": "^0.3.2"
  }
```

## How To Build And Run
>* 1.Prepare your environment: Requirements and Android Setup
>* 2.Clone this repo, and goto the project root directory
>* 3.run: npm install
>* 4.run only for ios: react-native run-ios and `iOS`
>* 5.run only for android: react-native run-android
>* 6.Enjoy

### iOS(react-native-contacts)
1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. add `./node_modules/react-native-contacts/ios/RCTContacts.xcodeproj`
3. In the XCode project navigator, select your project, select the `Build Phases` tab and in the `Link Binary With Libraries` section add **libRCTContacts.a**

### iOS(react-native-image-picker)

1. In the XCode's "Project navigator", right click on your project's Libraries folder ➜ `Add Files to <...>`
2. Go to `node_modules` ➜ `react-native-image-picker` ➜ `ios` ➜ select `RNImagePicker.xcodeproj`
3. Add `RNImagePicker.a` to `Build Phases -> Link Binary With Libraries`
4. Compile and have fun

### iOS(react-native-material-kit)

1. Add `node_modules/react-native-material-kit/iOS/RCTMaterialKit.xcodeproj` to your xcode project, usually under the `Libraries` group
1. Add `libRCTMaterialKit.a` (from `Products` under `RCTMaterialKit.xcodeproj`) to build target's `Linked Frameworks and Libraries` list
