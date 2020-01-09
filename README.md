# jv-trends-client-mobile

## What is it ?

This repository contains a one-page application. It is created with React Native framework. It is designed to work with a web application whose purpose is to track the most popular topics of one of the most active french online forum.

The web app is available [here](https://github.com/BMatthai/jv-trends-server).

## Usage

1. Place into this project folder and run *npm i* or *yarn* (It should install every packages contained in package.json file in a "node_modules" folder)

2. Run the application throught CLI via the command : "yarn start" (It uses Expo CLI to embed native frameworks for iOS and Android)

## Preview

Here is a preview of the react-native application on an Android device:

<img src="https://github.com/BMatthai/jv-trends-client-mobile/blob/master/resources/jv-trends-preview-1?raw=true " height="400" />

Each row represents a single topic from the forum "18-25" on website jeuxvideo.com. The first column contains the topic title. Second column contains the number of post as it was 2 hours ago. Third column is the last count of number of posts. Fourth column contains the difference between the two previous values.

Additionaly it is possible to tap on each row to redirect to the related topic.

