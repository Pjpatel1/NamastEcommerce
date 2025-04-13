
#!/bin/bash
# Watch for changes and auto-push to GitHub
echo "Starting Git watcher. Press Ctrl+C to stop."
fswatch -o ./ | while read; do
    sleep 5
    git add . && \
    git commit -m "Auto-update: $(date +'%m/%d %H:%M')" && \
    git push origin master && \
    osascript -e 'display notification "Pushed changes to GitHub!" with title "Auto-Deploy"'
done