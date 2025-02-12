
pipeline {
    agent any

    environment {
        PROJECT_NAME = "cypress-allure"
        ALLURE_RESULTS = "allure-results"
        ALLURE_REPORT = "allure-report"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch:"main",url:'https://github.com/ayoubasmahri/cypress-gitlab'  // Update with your GitLab/GitHub repo
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${PROJECT_NAME}")
                }
            }
        }

        stage('Run Cypress Tests in Docker') {
            steps {
                script {
                    sh "docker run --rm -v \$(pwd)/${ALLURE_RESULTS}:/app/${ALLURE_RESULTS} ${PROJECT_NAME}"
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                script {
                    sh "allure generate ${ALLURE_RESULTS} --clean -o ${ALLURE_REPORT}"
                }
            }
        }

        stage('Archive Allure Report') {
            steps {
                archiveArtifacts artifacts: "${ALLURE_REPORT}/**", fingerprint: true
            }
        }

        stage('Publish Allure Report') {
            steps {
                allure includeProperties: false, reportBuildPolicy: 'ALWAYS', results: [[path: "${ALLURE_RESULTS}"]]
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
