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
      node { build job: "../fint-adminportal-mockups/${env.BRANCH_NAME}", parameters: [string(name: 'RUN_TYPE', value: 'triggered')] }
      node { build job: "../fint-kundeportal-mockups/${env.BRANCH_NAME}", parameters: [string(name: 'RUN_TYPE', value: 'triggered')] }
    }
  }

  catch (err) {
    currentBuild.result = "FAILURE"
    throw err
  }
}
