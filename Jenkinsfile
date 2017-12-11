node('BuildOnAws')  {
    properties([disableConcurrentBuilds()])
    stage('Groovy Code Checkout'){
     retry(3){
      timeout(time: 600, unit: 'SECONDS'){
        checkout([
          $class: 'GitSCM',
          branches: [
            [name: "*/master"]
          ],
          doGenerateSubmoduleConfigurations: false,
          extensions: [],
          submoduleCfg: [],
          userRemoteConfigs: [
            [
              credentialsId: "git",
              url: "ssh://git@git.natura.com.br:8022/infraestrutura/jenkins.git",
            ]
          ]
        ])
      }
    }
   }
   stage('start groovy'){
      echo "starting evaluate teste.groovy"
      evaluate(readFile("${WORKSPACE}/aplicacoes/build-app-natura.groovy"))
   }
}
