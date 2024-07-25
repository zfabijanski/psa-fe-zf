pipeline {
    agent any
    stages {
        stage('init env var') {
            steps {
                script{
                    env.NODE_JS_INSTALL = 'NodeJS_16_yarn'
                    nodejs(nodeJSInstallationName: "${NODE_JS_INSTALL}"){
                        sh 'yarn --version'
                        env.NPM_VERSION = sh(returnStdout: true, script: "yarn --silent echo-version").trim()
                    }
                    env.NPM_NEXT_VERSION = sh(returnStdout: true, script: "echo `echo $NPM_VERSION | cut -d . -f 1-2`.\$((`echo $NPM_VERSION | cut -d . -f 3` + 1))").trim()
                    env.DOCKER_SECRET = 'artifactory';
                    env.DEPLOY_BUILD_DATE = sh(returnStdout: true, script: "date +'%Y-%m-%d %H:%M'").trim()
                    env.LAST_COMMIT_AUTHOR = sh(returnStdout: true, script: 'git log -1 --format=format:"%aN"').trim()
                    env.BRANCH_TYPE = sh(returnStdout: true, script: "echo ${BRANCH_NAME} | cut -d / -f 1").trim()
                    env.DOCKER_NAME = 'psa-fe'
                    env.JENKINS_GIT_CREDENTIALS_ID = 'lwgit-01'
                    env.CI = 'true'
                }
            }
        }

        stage('clean') {
            steps {
                sh 'rm -rfv build'
                sh 'rm -rfv storybook-static'
            }
        }

        stage('yarn install') {
            steps{
                nodejs(nodeJSInstallationName: "${NODE_JS_INSTALL}"){
                    sh 'yarn update'
                }
            }
        }

        // CI
        stage('CI:  yarn test') {
            when {
                not {
                    anyOf {
                        tag "*"; branch 'master'; branch 'develop'; branch 'release/*'; branch 'hotfix_release/*'; branch 'setup/*'
                    }
                }
            }
            steps{
                nodejs(nodeJSInstallationName: "${NODE_JS_INSTALL}"){
                    sh 'yarn test'
                }
            }
        }

        stage('CI: yarn build') {
            when {
                not {
                    anyOf {
                        tag "*"; branch 'master'; branch 'develop'; branch 'release/*'; branch 'hotfix_release/*'; branch 'setup/*'
                    }
                }
            }
            steps {
                nodejs(nodeJSInstallationName: "${NODE_JS_INSTALL}"){
                    sh 'REACT_APP_VERSION=${BRANCH_TYPE}-${DEPLOY_BUILD_DATE} yarn build'
                    sh 'printenv'
                }
            }
        }

        // CD
        stage('CD: next patch version') {
            when {
                allOf {
                    not {
                        environment name: 'LAST_COMMIT_AUTHOR', value: "${JENKINS_GIT_FULL_NAME}"
                    }
                    anyOf {
                        branch 'develop'; branch 'release/*'; branch 'hotfix_release/*'
                    }
                }
            }
            steps {
                sh 'git tag -d v${NPM_NEXT_VERSION} || echo "No broken tags to remove"'
                git url: "${GIT_URL}",
                    credentialsId: "${JENKINS_GIT_CREDENTIALS_ID}",
                    branch: "${BRANCH_NAME}"
                sh 'printenv'
                sh 'git remote -v'
                sh 'git reset origin/${BRANCH_NAME} --hard'
                sh 'git branch -u origin/${BRANCH_NAME}'
                nodejs(nodeJSInstallationName: "${NODE_JS_INSTALL}"){
                    sh 'yarn version --patch'
                }
                sh 'git log -1 --format=format:"%aN"'
                withCredentials([usernamePassword(credentialsId: "${JENKINS_GIT_CREDENTIALS_ID}", usernameVariable: 'GIT_AUTH_USR', passwordVariable: 'GIT_AUTH_PSW')]) {
                    sh('git config --local credential.helper "! credential() { echo username=\\$GIT_AUTH_USR; echo password=\\$GIT_AUTH_PSW; }; credential"')
                    sh("git push --follow-tags ${GIT_URL}")
                    sh('git config --local --unset credential.helper')
                }
            }
        }
        stage('CD: yarn build') {
            when {
                anyOf {
                    branch 'master';
                    allOf {
                        environment name: 'LAST_COMMIT_AUTHOR', value: "${JENKINS_GIT_FULL_NAME}";
                        anyOf {
                            branch 'develop'; branch 'release/*'; branch 'hotfix_release/*'
                        }
                    }
                }
            }
            steps {
                nodejs(nodeJSInstallationName: "${NODE_JS_INSTALL}"){
                    sh 'REACT_APP_VERSION=${BRANCH_TYPE}-${NPM_VERSION}-${DEPLOY_BUILD_DATE} yarn build'
                    sh 'printenv'
                }
            }
        }
        stage('CD: build image and push to nexus') {
            when {
                anyOf {
                    branch 'master';
                    allOf {
                        environment name: 'LAST_COMMIT_AUTHOR', value: "${JENKINS_GIT_FULL_NAME}";
                        anyOf {
                            branch 'develop'; branch 'release/*'; branch 'hotfix_release/*'
                        }
                    }
                }
            }
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_SECRET}", usernameVariable: 'login', passwordVariable: 'password')]) {
                    sh 'docker build -t ${ARTIFACTORY_URL}/${DOCKER_NAME}:${BRANCH_TYPE}-${NPM_VERSION} --label version=${NPM_VERSION} -f .config/Dockerfile . '
                    sh 'docker login -u ${login} -p ${password} ${ARTIFACTORY_URL} '
                    sh 'docker push ${ARTIFACTORY_URL}/${DOCKER_NAME}:${BRANCH_TYPE}-${NPM_VERSION} '

                    sh 'docker tag ${ARTIFACTORY_URL}/${DOCKER_NAME}:${BRANCH_TYPE}-${NPM_VERSION} ${ARTIFACTORY_URL}/${DOCKER_NAME}:${BRANCH_TYPE}-latest'
                    sh 'docker push ${ARTIFACTORY_URL}/${DOCKER_NAME}:${BRANCH_TYPE}-latest'
                }
            }
        }

        // SETUP
        stage('setup-branch: yarn build') {
            when {
                branch 'setup/*';
            }
            steps {
                nodejs(nodeJSInstallationName: "${NODE_JS_INSTALL}"){
                    sh 'REACT_APP_VERSION=${BRANCH_TYPE}-${NPM_VERSION}-${DEPLOY_BUILD_DATE} yarn build'
                    sh 'printenv'
                }
            }
        }
        stage('setup-branch: build image and push to nexus') {
            when {
                branch 'setup/*';
            }
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_SECRET}", usernameVariable: 'login', passwordVariable: 'password')]) {
                    script{
                        def dockerTag = BRANCH_NAME.replaceAll("/","-")
                        def dockerNameTag = "${ARTIFACTORY_URL}/${DOCKER_NAME}:${dockerTag}"
                        sh "docker build -t ${dockerNameTag} --build-arg PRU_APP_VERSION=${NPM_VERSION} --build-arg PRU_APP_NAME=${DOCKER_NAME} -f .config/Dockerfile . "
                        sh "docker login -u ${login} -p ${password} ${ARTIFACTORY_URL} "
                        sh "docker push ${dockerNameTag} "
                    }
                }
            }
        }

        // TAG
        stage('TAG: yarn build') {
            when {
                tag "*";
            }
            steps {
                nodejs(nodeJSInstallationName: "${NODE_JS_INSTALL}"){
                    sh 'REACT_APP_VERSION=${BRANCH_TYPE}-${DEPLOY_BUILD_DATE} yarn build'
                    sh 'printenv'
                }
            }
        }
        stage('TAG: build image and push to nexus') {
            when {
                tag "*";
            }
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_SECRET}", usernameVariable: 'login', passwordVariable: 'password')]) {
                    sh 'docker build -t ${ARTIFACTORY_URL}/${DOCKER_NAME}:${BRANCH_TYPE} -f .config/Dockerfile . '
                    sh 'docker login -u ${login} -p ${password} ${ARTIFACTORY_URL} '
                    sh 'docker push ${ARTIFACTORY_URL}/${DOCKER_NAME}:${BRANCH_TYPE} '
                }
            }
        }

        stage('Push image to CrowdStrike') {
            when {
                anyOf {
                    branch 'master';
                    allOf {
                        environment name: 'LAST_COMMIT_AUTHOR', value: "${JENKINS_GIT_FULL_NAME}";
                        anyOf {
                            branch 'develop'; branch 'release/*'; branch 'hotfix_release/*'
                        }
                    }
                }
            }
            steps {
                withCredentials([
                        usernamePassword(credentialsId: "${DOCKER_SECRET}", usernameVariable: 'login', passwordVariable: 'password'),
                        usernamePassword(credentialsId: "crowdstrike", usernameVariable: 'crowdstrikeUser', passwordVariable: 'crowdstrikePassword'),
                ]) {
                  sh 'docker tag ${ARTIFACTORY_URL}/${DOCKER_NAME}:${BRANCH_TYPE}-${NPM_VERSION} ${CROWDSTRIKE_REGISTRY_URL}/${DOCKER_NAME}:${BRANCH_TYPE}-${NPM_VERSION}'
                  sh 'docker login -u ${crowdstrikeUser} -p ${crowdstrikePassword} ${CROWDSTRIKE_REGISTRY_URL}'
                  sh 'docker push ${CROWDSTRIKE_REGISTRY_URL}/${DOCKER_NAME}:${BRANCH_TYPE}-${NPM_VERSION}'
                }
            }
        }
    }
    post {
        always {
            cleanWs()
            script{
                if (env.BRANCH_NAME == 'master' ||
                    env.BRANCH_NAME =~ 'setup/*' ||
                    (env.LAST_COMMIT_AUTHOR == "${JENKINS_GIT_FULL_NAME}" &&
                        (env.BRANCH_NAME == 'develop' ||
                        env.BRANCH_NAME =~ 'release/*' ||
                        env.BRANCH_NAME =~ 'hotfix_release/*')
                    )
                ) {
                    notifyBuild(currentBuild.currentResult)
                } else {
                    sh 'echo step skipped'
                }
            }
        }
    }
}

void notifyBuild(String buildStatus = 'STARTED') {
    buildStatus =  buildStatus ?: 'UNKNOWN'

    def color = 'BLUE'
    def colorCode = '#0000FF'

    if (buildStatus == 'STARTED') {
        color = 'YELLOW'
        colorCode = '#FFFF00'
    } else if (buildStatus == 'SUCCESS') {
        color = 'GREEN'
        colorCode = '#00FF00'
    } else {
        color = 'RED'
        colorCode = '#FF0000'
    }
    def jobName = env.JOB_NAME.split('/')[0]
    def projectUrl = "${JENKINS_URL}job/${jobName}"

    def message = """*${jobName}*   v._${NPM_VERSION}_   ${buildStatus}!
:building_construction:<${projectUrl}|${jobName}>   :herb:<${JOB_URL}|${env.BRANCH_NAME}>   :construction:<${BUILD_URL}|${env.BUILD_NUMBER}>   :spiral_note_pad:<${BUILD_URL}console|console>"""

    slackSend (color: colorCode, message: message)
}
