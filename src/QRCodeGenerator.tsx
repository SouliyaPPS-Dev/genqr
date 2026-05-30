import React, { useRef } from "react";
import { toPng } from "html-to-image";

const QRCodeGenerator: React.FC = () => {
  const url = "https://buddhaword.free.nf";
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    if (qrCodeRef.current === null) {
      return;
    }

    toPng(qrCodeRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "qr-code.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Failed to download QR code image:", err);
      });
  };

  const openUrl = () => {
    window.open(url, "_blank");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div ref={qrCodeRef}>
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(
            url,
          )}`}
          alt="QR Code"
          onClick={openUrl}
          style={{ cursor: "pointer" }}
        />
      </div>
      <button onClick={downloadQRCode} style={{ marginTop: "20px" }}>
        Download QR Code
      </button>
    </div>
  );
};

export default QRCodeGenerator;
