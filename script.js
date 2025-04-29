let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let downloadBtn = document.getElementById("downloadBtn");

function generateQR() {
  if (qrText.value.trim() === "") {
    qrText.classList.add("shake");
    setTimeout(() => {
      qrText.classList.remove("shake");
    }, 300);
    return;
  }

  const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
    encodeURIComponent(qrText.value);

  qrImage.src = qrUrl;
  qrImage.onload = () => {
    imgBox.style.display = "block";
  };
}

// Force download as .jpg
downloadBtn.addEventListener("click", function () {
  const qrUrl = qrImage.src;
  if (!qrUrl || qrText.value.trim() === "") return;

  fetch(qrUrl)
    .then(res => res.blob())
    .then(blob => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "QRCode.jpg"; // specify filename and extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(err => {
      console.error("Download failed:", err);
    });
});
