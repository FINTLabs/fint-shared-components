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
      build '../fint-adminportal-mockups/${env.BRANCH_NAME}'
      build '../fint-kundeportal-mockups/${env.BRANCH_NAME}'
    }
  }

  catch (err) {
    currentBuild.result = "FAILURE"
    throw err
  }
}
