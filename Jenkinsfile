def pipeline_main
node('master') {
  sh "curl -L $PIPELINE_V1_MAIN_URL > main.groovy"
  pipeline_main = load 'main.groovy'
}
pipeline_main()
