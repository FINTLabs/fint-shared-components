#!groovy

node {
  currentBuild.result = "SUCCESS"

  try {
    stage('checkout') {
      checkout scm
    }

    stage('build') {
      sh 'npm install'
    }

    stage('Building portals') {
      build job: "../fint-admin-portal/${env.BRANCH_NAME}", parameters: [string(name: 'RUN_TYPE', value: 'triggered')]
      build job: "../fint-kunde-portal/${env.BRANCH_NAME}", parameters: [string(name: 'RUN_TYPE', value: 'triggered')]
    }
  }

  catch (err) {
    currentBuild.result = "FAILURE"
    throw err
  }
}
