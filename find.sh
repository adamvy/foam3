# Concatenate JDAO files from subdirectories into one JDAO
find **/src -type f -name brokers -exec cat {} \; > brokers
find **/src -type f -name businessSectors -exec cat {} \; > businessSectors
find **/src -type f -name businessTypes -exec cat {} \; > businessTypes
find **/src -type f -name cicoServiceProviders -exec cat {} \; > cicoServiceProviders
find **/src -type f -name countries -exec cat {} \; > countries
find **/src -type f -name cronjobs -exec cat {} \; > cronjobs
find **/src -type f -name currencies -exec cat {} \; > currencies
find **/src -type f -name corridors -exec cat {} \; > corridors
find **/src -type f -name payoutOptions -exec cat {} \; > payoutOptions
find **/src -type f -name transactionPurposes -exec cat {} \; > transactionPurposes
find **/src -type f -name dugs -exec cat {} \; > dugs
find **/src -type f -name emailTemplates -exec cat {} \; > emailTemplates
find **/src -type f -name exportDriverRegistrys -exec cat {} \; > exportDriverRegistrys
find **/src -type f -name groups -exec cat {} \; > groups
find **/src -type f -name languages -exec cat {} \; > languages
find **/src -type f -name menus -exec cat {} \; > menus
find **/src -type f -name permissions -exec cat {} \; > permissions
find **/src -type f -name regions -exec cat {} \; > regions
find **/src -type f -name scripts -exec cat {} \; > scripts
find **/src -type f -name services -exec cat {} \; > services
find **/src -type f -name tests -exec cat {} \; > tests
find **/src -type f -name transactionLimits -exec cat {} \; > transactionLimits
find **/src -type f -name users -exec cat {} \; > users
find **/src -type f -name institutions -exec cat {} \; > institutions
