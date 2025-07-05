// Initialize EmailJS
document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("Z89F4-XIYigR7_oY-");

  const form = document.getElementById("contactForm");

  if (!form) {
    console.error("Form not found!");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      Swal.fire({
        title: "Missing Fields!",
        text: "Please fill out all fields.",
        icon: "warning",
        confirmButtonText: "OK"
      });
      return;
    }

    // Save to localStorage
    const contactData = {
      name,
      email,
      message,
      submittedAt: new Date().toLocaleString()
    };

    const existing = JSON.parse(localStorage.getItem("contactMessages")) || [];
    existing.push(contactData);
    localStorage.setItem("contactMessages", JSON.stringify(existing));

    // Send via EmailJS
    emailjs.sendForm("service_mcebh9j", "template_7uffh1p", form)
      .then(function () {
        Swal.fire({
          title: "Message Sent!",
          text: "Your message has been sent successfully ✅",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
          backdrop: true,
          allowOutsideClick: false,
        });
        form.reset();
      }, function (error) {
        console.log("FAILED...", error);
        Swal.fire({
          title: "Failed!",
          text: "Something went wrong. Please try again later ❌",
          icon: "error",
          confirmButtonText: "OK"
        });
      });
  });
});
