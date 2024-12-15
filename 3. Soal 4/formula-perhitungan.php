<?php
function findCombination($numbers, $target)
{
    // Menggunakan semua kombinasi operator antara angka
    $numOfOperators = count($numbers) - 1;
    $combinations = getOperatorCombinations($numOfOperators);

    foreach ($combinations as $comb) {
        $expr = $numbers[0];
        for ($i = 0; $i < $numOfOperators; $i++) {
            $expr .= " " . $comb[$i] . " " . $numbers[$i + 1];
        }

        // Mengevaluasi ekspresi
        if (eval("return " . $expr . ";") == $target) {
            return $expr;
        }
    }

    return "Tidak ada kombinasi yang menghasilkan target.";
}

// Fungsi untuk menghasilkan semua kombinasi operator
function getOperatorCombinations($n)
{
    $operators = ['+', '-', '*'];

    // Membuat semua kombinasi operator untuk jumlah yang dibutuhkan
    $operatorPermutations = getPermutations($operators, $n);
    return $operatorPermutations;
}

// Fungsi untuk menghasilkan permutasi operator
function getPermutations($array, $n)
{
    $results = [];
    if ($n == 0) {
        return [[]];
    }

    foreach ($array as $operator) {
        $subPermutations = getPermutations($array, $n - 1);
        foreach ($subPermutations as $sub) {
            array_push($results, array_merge([$operator], $sub));
        }
    }
    return $results;
}

$input1 = [1, 4, 5, 6];
$target1 = 16;
echo "Input: " . implode(", ", $input1) . "\n";
echo "Target: " . $target1 . "\n";
echo "Output: " . findCombination($input1, $target1) . "\n\n";

$input2 = [1, 4, 5, 6];
$target2 = 18;
echo "Input: " . implode(", ", $input2) . "\n";
echo "Target: " . $target2 . "\n";
echo "Output: " . findCombination($input2, $target2) . "\n\n";

$input3 = [1, 4, 5, 6];
$target3 = 50;
echo "Input: " . implode(", ", $input3) . "\n";
echo "Target: " . $target3 . "\n";
echo "Output: " . findCombination($input3, $target3) . "\n\n";
