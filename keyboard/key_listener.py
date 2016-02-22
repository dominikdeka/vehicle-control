#!/usr/bin/env python

import usb.core
import usb.util
import time
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setup([22,23,24,25], GPIO.OUT)
r = GPIO.PWM(23, 100)
l = GPIO.PWM(25, 100)

USB_VENDOR  = 0x05af # Rii
USB_PRODUCT = 0x0906 # Mini Wireless Keyboard

USB_IF      = 0 # Interface
USB_TIMEOUT = 5 # Timeout in MS

BTN_GEAR_1  = 30
BTN_GEAR_2  = 31
BTN_GEAR_3  = 32
BTN_GEAR_4  = 33
BTN_LEFT  = 80
BTN_RIGHT = 79
BTN_DOWN  = 81
BTN_UP    = 82
BTN_STOP  = 44 # Space
BTN_EXIT  = 41 # ESC

dev = usb.core.find(idVendor=USB_VENDOR, idProduct=USB_PRODUCT)
endpoint = dev[0][(0,0)][0]

if dev.is_kernel_driver_active(USB_IF) is True:
  dev.detach_kernel_driver(USB_IF)

usb.util.claim_interface(dev, USB_IF)

speed_left = 0
speed_right = 0
current_speed = 40
direction = 0
while True:
    control = None
    try:
        control = dev.read(endpoint.bEndpointAddress, endpoint.wMaxPacketSize, USB_TIMEOUT)
        print(control)
    except:
        pass

    if control != None:
        if BTN_GEAR_1 in control:
            current_speed = 40

        if BTN_GEAR_2 in control:
            current_speed = 55

        if BTN_GEAR_3 in control:
            current_speed = 70

        if BTN_GEAR_4 in control:
	    current_speed = 85

        if BTN_DOWN in control:
	    direction = 1
            speed_left = current_speed
            speed_right = current_speed

        if BTN_UP in control:
	    direction = 0
            speed_left = current_speed
            speed_right = current_speed

        if BTN_LEFT in control:
            speed_left = current_speed - 15
            speed_right = current_speed + 15

        if BTN_RIGHT in control:
	    speed_left = current_speed + 15
	    speed_right = current_speed - 15

        if BTN_UP not in control and BTN_DOWN not in control:
	    direction = 0
	    speed_left = 0
	    speed_right = 0

        if BTN_EXIT in control:
	    GPIO.cleanup()
            exit()

	if speed_left < 0:
	    speed_left = 0

	if speed_right < 0:
	    speed_right = 0
	print speed_left
	print speed_right
	print direction	
	GPIO.output([22, 24], direction)
	l.start(speed_left)
	r.start(speed_right)

    time.sleep(0.02)

