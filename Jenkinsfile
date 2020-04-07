node {
  stage('checkout') {
    checkout([
      $class                           : 'GitSCM',
      branches                         : [[name: 'dev']],
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

  stage("remote") {
    sshPublisher(
      publishers: [
        sshPublisherDesc(
          configName: 'snewpeap',
          transfers: [
            sshTransfer(
              cleanRemote: false,
              excludes: '',
              execCommand: '''docker rm -f se3www
cd /root/se3frontend && docker build -f Dockerfile -t se3vue . && docker run -d -p 80:80 --link se3:se3 --name se3www se3vue:latest''',
              execTimeout: 120000,
              flatten: false,
              makeEmptyDirs: false,
              noDefaultExcludes: false,
              patternSeparator: '[, ]+',
              remoteDirectory: 'se3frontend',
              remoteDirectorySDF: false,
              removePrefix: '',
              sourceFiles: 'dist/*,Dockerfile,nginx.conf'
            )
          ],
          usePromotionTimestamp: false,
          useWorkspaceInPromotion: false,
          verbose: false
        )
      ]
    )
  }

//  stage("docker-build") {
//    sh "docker build -f Dockerfile -t se3vue ."
//  }
//
//  stage("restart") {
//    try {
//      sh "docker rm -f se3www"
//    } catch (ignored) {
//      echo('WWW container not created')
//    }
//    sh "docker run -d -p 80:80 --link se3:se3 --name se3www se3vue:latest"
//  }
}
