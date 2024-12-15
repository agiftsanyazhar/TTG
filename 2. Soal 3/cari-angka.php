<?php
function findMissingNumber($array)
{
    sort($array);

    for ($i = 0; $i < count($array) - 1; $i++) {
        if ($array[$i + 1] - $array[$i] > 1) {
            return $array[$i] + 1;
        }
    }

    return null;
}

$input1 = [3, 0, 2, 4];
echo "Angka yang Hilang: " . findMissingNumber($input1) . "\n";

$input2 = [3106, 3102, 3104, 3105, 3107];
echo "Angka yang Hilang: " . findMissingNumber($input2) . "\n";
