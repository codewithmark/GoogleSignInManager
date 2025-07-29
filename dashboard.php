<?php
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: index.html");
    exit;
}

$user = $_SESSION['user'];
?>
<!DOCTYPE html>
<html>
<head><title>Dashboard</title></head>
<body>
  <h1>Welcome, <?= htmlspecialchars($user['full_name']) ?>!</h1>
  <p>Email: <?= htmlspecialchars($user['email']) ?></p>
  <img src="<?= htmlspecialchars($user['picture']) ?>" width="100" alt="Profile Picture">
  <p><a href="logout.php">Logout</a></p>
</body>
</html>