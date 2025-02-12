pipeline {
    agent any

    environment {
        IMAGE_NAME = "cypress-allure"
        CONTAINER_NAME = "cypress-test-run"
        ALLURE_RESULTS = "allure-results"
        ALLURE_REPORT = "allure-report"
        ALLURE_REPORT_URL = "http://localhost:8080/job/cypress-ci/${BUILD_NUMBER}/allure" // Update with the actual URL
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: "main", url: 'https://github.com/ayoubasmahri/cypress-ci'  // Update with your GitLab/GitHub repo
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }

        stage('Run Cypress Tests in Docker') {
            steps {
                script {
                    sh """
                        docker run --name ${CONTAINER_NAME} ${IMAGE_NAME}
                    """ 
                }
            }
        }

        stage('Copy Allure Report') {
            steps {
                script {
                    sh "docker cp ${CONTAINER_NAME}:/app/allure-results ./allure-results"
                }
            }
        }

        stage('Stop & Remove Container') {
            steps {
                script {
                    sh "docker rm -f ${CONTAINER_NAME}"
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'allure generate allure-results --clean -o allure-report'
            }
        }

        stage('Archive Allure Report') {
            steps {
                archiveArtifacts artifacts: 'allure-report/**', fingerprint: true
            }
        }

        stage('Publish Allure Report') {
            steps {
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
        always {
            script {
                def buildStatus = currentBuild.currentResult
                def buildUrl = env.BUILD_URL
                def branchName = env.GIT_BRANCH ?: 'N/A'

                slackSend(channel: "jenkins", 
                          message: """
                              Pipeline Status: ${buildStatus}
                              Branch: ${branchName}
                              Build URL: ${buildUrl}
                              Allure Report: <${ALLURE_REPORT_URL}|Click here to view the report>
                              """
                )
            }
            cleanWs()
        }
    }
}
