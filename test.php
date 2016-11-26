
<?php


$search_text=stripslashes($_GET['search_text']);
if(!$search_text) { header('Location:'.$_SERVER['PHP_SELF'].'?search_text=sunrise'); exit; }

$api_call = 'http://api.aucklandmuseum.com/search/collectionsonline/_search?q=beer'.urlencode($search_text);
$api_response = json_decode(file_get_contents($api_call),true);
//var_dump($api_response['results']);

foreach($api_response['results'] as $result) {
  echo '<a href="'.$result['primaryRepresentation'].'">
        <img src="'.$result['primaryRepresentation'].'"/>
        <br/>'.htmlspecialchars($result['department'],ENT_COMPAT,'UTF-8').'</a><br /><br />';
}
?>