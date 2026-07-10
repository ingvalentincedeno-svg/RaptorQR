# 📱 RaptorQR - Send files offline using QR codes

[https://github.com/ingvalentincedeno-svg/RaptorQR](https://github.com/ingvalentincedeno-svg/RaptorQR)

RaptorQR lets you move files and text between devices without an internet connection. It converts your data into a sequence of animated QR codes. You scan these codes with another device to reconstruct your original file. This process works entirely offline and protects your privacy.

## 🛠️ System Requirements

- Operating System: Windows 10 or Windows 11
- Processor: Dual-core CPU or better
- Storage: 100 MB of available space
- Camera: A working webcam or document scanner for the receiving device
- Network: No internet connection required

## 📥 How to Install

You need to obtain the installation file from the official source.

1. Visit this page to download: [https://github.com/ingvalentincedeno-svg/RaptorQR](https://github.com/ingvalentincedeno-svg/RaptorQR)
2. Locate the latest release section on the webpage.
3. Select the Windows installer file ending in .exe.
4. Download the file to your computer.
5. Open the downloaded file to start the installation.
6. Follow the instructions on your screen to complete the setup.

## 🚀 Getting Started

Once you install the software, you can begin transferring data. Ensure you have the software installed on both the sender device (with the file) and the receiver device (with the camera).

### Sending a File

1. Open the RaptorQR application on the computer that holds your file.
2. Click the button labeled Select File.
3. Choose the document, image, or text file you want to transfer.
4. Click the Send button.
5. The window will display a series of QR codes that change rapidly. Keep this window open until the transfer finishes.

### Receiving a File

1. Open the RaptorQR application on the second device.
2. Select the Receive mode.
3. Grant the application permission to use your camera when prompted.
4. Point your camera at the screen showing the animated QR codes.
5. The application will track the codes and rebuild your file. 
6. Watch for a progress bar that shows the completion percentage.
7. Save the file to your preferred folder once the transfer finishes.

## 🔒 Privacy and Security

RaptorQR operates locally on your hardware. It does not upload your files to the cloud. The camera feed stays within the application memory. Because the system uses fountain codes, the software can reconstruct the data even if some frames drop during the scan. This makes the transfer reliable despite minor camera movement or lighting issues.

## 💡 Troubleshooting

If the scan stops or fails, try the following steps:

- Ensure the entire QR code appears within the camera preview box.
- Clean your camera lens to improve focus.
- Reduce screen glare by adjusting the brightness of the sender's monitor.
- Keep the camera steady during the scan.
- Ensure the sender and receiver applications remain in the foreground.

## 📈 Performance Tips

The software uses WASM and RaptorQ algorithms to ensure speed. Larger files take more time to encode. For the best experience, place the camera at a distance where the QR code fills most of the frame. If you send text, copy and paste the text directly into the input window rather than choosing a file. This method works faster for small amounts of information.

Keywords: file-transfer, fountain-codes, offline, p2p, privacy, qr-code, qr-loop, qrcode, qrcode-generator, qrcode-scanner, raptorq, wasm