node {
  stage('checkout') {
    checkout([
      $class                           : 'GitSCM',
      branches                         : [[name: '**']],
      doGenerateSubmoduleConfigurations: false,
      extensions                       : [],
      submoduleCfg                     : [],
      userRemoteConfigs                : [
        [credentialsId: 'se3-gitlab',
         url          : 'http://212.129.149.40/171250558_teamnamecannotbeempty/frontend-webtest.git'
        ]
      ]
    ])
  }

  stage("npm") {
    nodejs(configId: '0aab61de-4a53-4f1f-b364-c6b9c63c9b28', nodeJSInstallationName: 'nodejs') {
      sh 'npm set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/ && npm install -g node-sass'
      sh 'npm install && npm run build'
    }
  }

  stage("docker-build") {
    sh "docker build -f Dockerfile -t se3vue ."
  }

  stage("restart") {
    try {
      sh "docker rm -f se3www"
    } catch (ignored) {
      echo('WWW container not created')
    }
    sh "docker run -d -p 80:80 --link se3:se3 --name se3www se3vue:latest"
  }
}
