<!DOCTYPE html>
<?php session_start();
include 'dbh.php';
?>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>  
        <p>Connected to database</p>
        <?php       
        $sql = "SELECT * FROM person";     
        $numppl = mysqli_query($conn, $sql) -> num_rows;
        $i = 1;
        $j = 0;  
        
        $people = array_fill(0, $numppl, 0);    
        
        for($i = 1; $i <= $numppl; $i++){
            $name = mysqli_fetch_assoc(mysqli_query($conn, "SELECT CONCAT ((SELECT name FROM person WHERE person.person_id = '$i'), ' ', (SELECT surname FROM person WHERE person.person_id = '$i')) AS name")); 
            $ssn = mysqli_fetch_assoc(mysqli_query($conn, "SELECT ssn FROM person WHERE person.person_id = '$i'"));
            $email = mysqli_fetch_assoc(mysqli_query($conn, "SELECT email FROM person WHERE person.person_id = '$i'"));
            $password = mysqli_fetch_assoc(mysqli_query($conn, "SELECT password FROM person WHERE person.person_id = '$i'"));
            $role = mysqli_fetch_assoc(mysqli_query($conn, "SELECT role.name FROM person, role WHERE person.person_id = '$i' AND person.role_id = role.role_id"));
            $username = mysqli_fetch_assoc(mysqli_query($conn, "SELECT username FROM person WHERE person.person_id = '$i'"));                           
                  
            $numavailabilities = mysqli_query($conn, "SELECT * FROM availability, person WHERE person.person_id = availability.person_id AND person.person_id = '$i'") -> num_rows;
            $numcompetences = mysqli_query($conn, "SELECT * FROM competence_profile, person WHERE person.person_id = competence_profile.person_id AND person.person_id = '$i'") -> num_rows;         
            $availabilities = array_fill(0,$numavailabilites,0);                
            $competences = array_fill(0, $numcompetences, 0);
           
            for($j = 0; $j < $numavailabilities; $j++){                 
                $availabilities[$j] = mysqli_fetch_assoc(mysqli_query($conn, "SELECT from_date, to_date FROM availability, person WHERE person.person_id = availability.person_id AND person.person_id = '$i' LIMIT 1 OFFSET $j"));                                          
            }      
            for($j = 0; $j < $numcompetences; $j++) {   
                $competences[$j] = mysqli_fetch_assoc(mysqli_query($conn, "SELECT competence.name, years_of_experience FROM competence_profile, person, competence WHERE person.person_id = competence_profile.person_id AND person.person_id AND competence_profile.competence_id = competence.competence_id AND person.person_id = '$i' LIMIT 1 OFFSET $j"));                             
            }
            $people[$i-1] = json_encode(array("_id: MongoDB.Id", $name, $ssn, $email, $password, $role, $username, $availabilities, $competences, "status: string", "application_date: MongoDB.Date"));                              
            echo "- - - - NEW ENTRY  - - -";  
            echo $people[$i-1];                             
            }              
        //Code to add people to new database
        ?>
    </body>
</html>
