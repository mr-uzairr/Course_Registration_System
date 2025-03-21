document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const rollNumber = document.getElementById("rollNumber").value || null;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, rollNumber, password }),
    });

    const data = await response.json();
    
    if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = data.role === "admin" ? "admin.html" : "student.html";
    } else {
        alert(data.message);
    }
});
