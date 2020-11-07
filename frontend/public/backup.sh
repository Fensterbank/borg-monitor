#!/bin/bash
SCRIPT="backup.sh 1.1.0"
VARIABLES="variables.txt"
HOST="https://backup.f-bit.software"

BORG=$(awk -F= '$1=="BORG"{print $2;exit}' $VARIABLES) 
REPO=$(awk -F= '$1=="REPO"{print $2;exit}' $VARIABLES)
BORG_PATH=$(awk -F= '$1=="BORG_PATH"{print $2;exit}' $VARIABLES)
REPO_PATH=$(awk -F= '$1=="REPO_PATH"{print $2;exit}' $VARIABLES)
BORG_VERSION=$($BORG --version)

PATTERNS_FILE="$BORG_PATH/patterns-$REPO.lst"
EXCLUDE_FILE="$BORG_PATH/exclude-$REPO.txt"
PASSPHRASE_FILE="$BORG_PATH/.passphrase-$REPO"

echo "f-bit software - $SCRIPT"
echo "f-bit software - $SCRIPT - $(date +"%Y-%m-%dT%H:%M:%SZ")" >> $BORG_PATH/borg.log
echo "Bitte warten…"

initial_post_data()
{
  cat <<EOF
{
  "name": "$REPO",
  "repo": "$REPO_PATH",
  "borg": "$BORG_VERSION",
  "script": "$SCRIPT"
}
EOF
}

finished_post_data()
{
  cat <<EOF
{
  "stats": "$STATS"
}
EOF
}

export BORG_PASSCOMMAND="cat $PASSPHRASE_FILE"

ID=$(curl -s -H "Accept: application/json" -H "Content-Type:application/json" -X POST --data "$(initial_post_data)" "$HOST/backups/")
echo "Borg Monitor ID: $ID" >> $BORG_PATH/borg.log

$BORG create --stats --exclude-from $EXCLUDE_FILE --patterns-from $PATTERNS_FILE $REPO_PATH::backup-{utcnow} 2>> $BORG_PATH/borg.log

sleep 1
STATS=$(tail -n 20 borg.log | base64 -w 0)

if [[ $ID != "" ]]; then
  ID=$(curl -s -H "Accept: application/json" -H "Content-Type:application/json" -X PUT --data "$(finished_post_data)" "$HOST/backups/$ID")
  echo "Uploaded summary to Borg Monitor" >> $BORG_PATH/borg.log
else
  echo "NO summary uploaded to Borg Monitor" >> $BORG_PATH/borg.log
fi

echo "##############################################################################" >> $BORG_PATH/borg.log
echo "Vorgang abgeschlossen."
