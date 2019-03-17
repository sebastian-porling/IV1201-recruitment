<?php
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $dbServername = "localhost";
    $dbUsername = "root2";
    $dbPassword = "";
    $dbName = "Test";
    
    $conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);
    if ($conn->connect_error) {
        die("Connection failed ". $conn->connect_error);
    }

