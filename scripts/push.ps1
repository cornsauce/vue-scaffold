if ($Args.count -eq 0) {
    $commitMessage = "update"
} else {
    $commitMessage = $Args[0]
}

git add .
git commit -m $commitMessage
git push origin dev:dev
