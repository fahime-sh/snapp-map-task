import {string} from "postcss-selector-parser";

type name =string;
type lat = number;
type lng=number;
type icon = string;

type locationsData = [{
    name:name,
    lat:lat,
    lng:lng,
    icon:icon
}]

export const importantLocations = [
    { name: "ایران‌مال", lat: 35.7245, lng: 51.2253 ,icon:"/images/restaurantPointer.png"},
    { name: "تیراژه", lat: 35.7604, lng: 51.4167 ,icon:"/images/restaurantPointer.png"},
    { name: "کوروش", lat: 35.7106, lng: 51.3725 ,icon:"/images/restaurantPointer.png"},
    { name: "پالادیوم", lat: 35.8037, lng: 51.3945 ,icon:"/images/restaurantPointer.png"},
    { name: "میلاد نور", lat: 35.7375, lng: 51.4378 ,icon:"/images/restaurantPointer.png"},
    { name: "سام سنتر", lat: 35.7749, lng: 51.4064 ,icon:"/images/restaurantPointer.png"},
    { name: "ونک پارک", lat: 35.7625, lng: 51.4221 ,icon:"/images/restaurantPointer.png"},
    { name: "ارگ کریم‌خانی", lat: 35.7156, lng: 51.4078 ,icon:"/images/restaurantPointer.png"},
    { name: "گلستان", lat: 35.7462, lng: 51.4491 ,icon:"/images/restaurantPointer.png"},
    { name: "آریا", lat: 35.7742, lng: 51.4719 ,icon:"/images/restaurantPointer.png"},
];