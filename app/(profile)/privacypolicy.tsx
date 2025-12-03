import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacyPolicy() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <Header />
        <MandarinText className="text-xl font-bold  text-center">
          만다린 서비스 개인정보 처리 방침
        </MandarinText>
        <View className="w-96 mx-auto gap-6 mt-4">
          <MandarinText className="text-xs">
            TABA 10기 교육 중 만다린 서비스(이하 '만다린')는 이용자의 개인정보
            및 민감한 대화 정보 보호를 가장 중요하게 생각하며, 「개인정보
            보호법」 및 관련 법령을 준수하고 있습니다. 본 방침은 만다린 서비스
            이용 과정에서 수집, 이용, 제공, 파기되는 정보에 대한 기준을 명확히
            제시합니다.
          </MandarinText>
          <View>
            <MandarinText className="text-base font-bold">
              1. 수집하는 개인정보의 항목 및 목적
            </MandarinText>
            <MandarinText className="text-xs">
              만다린은 서비스 제공 및 기능 구현을 위해 최소한의 개인정보를
              수집하며, 특히 대화 데이터의 처리에 대해 명확히 고지합니다.
            </MandarinText>
          </View>
          <View>
            <MandarinText className="text-xs font-bold">회원가입</MandarinText>
            <View className="flex-row items-start gap-1">
              <MandarinText className="text-xs">1.</MandarinText>
              <MandarinText className="text-xs">
                <MandarinText className="text-xs underline">
                  수집 항목
                </MandarinText>
                <MandarinText className="text-xs">
                  {" "}
                  : 이메일 주소, 닉네임 (또는 ID)
                </MandarinText>
              </MandarinText>
            </View>
            <View className="flex-row items-start gap-1">
              <MandarinText className="text-xs">2.</MandarinText>
              <MandarinText className="text-xs">
                <MandarinText className="text-xs underline">
                  수집 및 이용 목적
                </MandarinText>
                <MandarinText className="text-xs">
                  {" "}
                  : 서비스 이용을 위한 본인 확인, 불만 처리, 고지 사항 전달
                </MandarinText>
              </MandarinText>
            </View>
            <View className="flex-row items-start gap-1">
              <MandarinText className="text-xs">3.</MandarinText>
              <MandarinText className="text-xs">
                <MandarinText className="text-xs underline">
                  보유 및 이용 기간
                </MandarinText>
                <MandarinText className="text-xs">
                  {" "}
                  : 회원 탈퇴 시까지
                </MandarinText>
              </MandarinText>
            </View>
          </View>
          <View>
            <MandarinText className="text-xs font-bold">
              서비스 이용 (필수)
            </MandarinText>
            <View className="flex-row items-start gap-1">
              <MandarinText className="text-xs">1.</MandarinText>
              <MandarinText className="text-xs">
                <MandarinText className="text-xs underline">
                  수집 항목
                </MandarinText>
                <MandarinText className="text-xs">
                  {" "}
                  : 연애 상대와의 대화 텍스트 데이터 (카카오톡 파일)
                </MandarinText>
              </MandarinText>
            </View>
            <View className="flex-row items-start gap-1">
              <MandarinText className="text-xs">2.</MandarinText>
              <MandarinText className="text-xs">
                <MandarinText className="text-xs underline">
                  수집 및 이용 목적
                </MandarinText>
                <MandarinText className="text-xs">
                  {" "}
                  : AI 캐릭터 생성, 채팅 시뮬레이션, 연애 관계 분석 리포트 제공
                  등 핵심 기능 구현
                </MandarinText>
              </MandarinText>
            </View>
            <View className="flex-row items-start gap-1">
              <MandarinText className="text-xs">3.</MandarinText>
              <MandarinText className="text-xs">
                <MandarinText className="text-xs underline">
                  보유 및 이용 기간
                </MandarinText>
                <MandarinText className="text-xs">
                  {" "}
                  : 분석 완료 후 7일 이내 마스킹된 데이터 및 원본 데이터 파기
                </MandarinText>
              </MandarinText>
            </View>
          </View>
          <View>
            <MandarinText className="text-xs font-bold">
              서비스 이용 (선택)
            </MandarinText>
            <View className="flex-row items-start gap-1">
              <MandarinText className="text-xs">1.</MandarinText>
              <MandarinText className="text-xs">
                <MandarinText className="text-xs underline">
                  수집 항목
                </MandarinText>
                <MandarinText className="text-xs">
                  {" "}
                  : 접속 로그, 서비스 이용 기록
                </MandarinText>
              </MandarinText>
            </View>
            <View className="flex-row items-start gap-1">
              <MandarinText className="text-xs">2.</MandarinText>
              <MandarinText className="text-xs">
                <MandarinText className="text-xs underline">
                  수집 및 이용 목적
                </MandarinText>
                <MandarinText className="text-xs">
                  {" "}
                  : 서비스 품질 개선, 오류 분석 및 통계 자료 활용
                </MandarinText>
              </MandarinText>
            </View>
            <View className="flex-row items-start gap-1">
              <MandarinText className="text-xs">3.</MandarinText>
              <MandarinText className="text-xs">
                <MandarinText className="text-xs underline">
                  보유 및 이용 기간
                </MandarinText>
                <MandarinText className="text-xs">
                  {" "}
                  : 관련 법령에 따름
                </MandarinText>
              </MandarinText>
            </View>
          </View>
          <MandarinText className="text-xs">
            이용자의 대화 텍스트 데이터는 오직 AI 분석만을 목적으로 하며, 식별
            가능한 모든 개인 정보는 분석 전 마스킹 처리됩니다. 원본 대화 파일은
            서버에 영구 보관되지 않으며, 분석 완료 후 안전하게 파기됩니다.
          </MandarinText>
          <View>
            <MandarinText className="text-base font-bold">
              2. 민감한 정보의 처리 및 마스킹
            </MandarinText>
            <MandarinText className="text-xs">
              만다린은 이용자가 업로드한 대화 텍스트 파일 내의 민감한
              정보(전화번호, 이메일 주소, 주민등록번호 등)를 다음과 같은 절차에
              따라 처리합니다.
            </MandarinText>
          </View>
          <View>
            <View className="flex-row items-start gap-1">
              <MandarinText className="text-xs">1.</MandarinText>
              <MandarinText className="text-xs">
                <MandarinText className="text-xs underline">
                  마스킹 처리
                </MandarinText>
                <MandarinText className="text-xs">
                  {" "}
                  : 업로드된 텍스트 파일은 백엔드 시스템에서 즉시 파싱되며,
                  사전에 정의된 정규 표현식(RegEx)을 통해 식별 가능한 모든 민감
                  정보가 대체 문자(**** 또는 [마스킹 처리됨])로 치환됩니다.
                </MandarinText>
              </MandarinText>
            </View>
            <View className="flex-row items-start gap-1">
              <MandarinText className="text-xs">2.</MandarinText>
              <MandarinText className="text-xs">
                <MandarinText className="text-xs underline">
                  분석 범위 한정
                </MandarinText>
                <MandarinText className="text-xs">
                  {" "}
                  : AI 모델에 전달되는 데이터는 오직 마스킹 처리된 순수한 대화
                  내용으로만 한정됩니다.
                </MandarinText>
              </MandarinText>
            </View>
            <View className="flex-row items-start gap-1">
              <MandarinText className="text-xs">3.</MandarinText>
              <MandarinText className="text-xs">
                <MandarinText className="text-xs underline">
                  보안 원칙
                </MandarinText>
                <MandarinText className="text-xs">
                  {" "}
                  : 회사의 개발자 및 운영진을 포함한 그 누구도 마스킹되지 않은
                  이용자의 원본 대화 내용을 열람하거나 이용할 수 없습니다.
                </MandarinText>
              </MandarinText>
            </View>
          </View>
          <View>
            <MandarinText className="text-base font-bold">
              3. 개인정보의 파기 절차 및 방법
            </MandarinText>
            <MandarinText className="text-xs">
              회사는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당
              정보를 지체 없이 파기합니다.
            </MandarinText>
          </View>
          <View>
            <View className="flex-row items-start gap-1">
              <MandarinText className="text-xs">1.</MandarinText>
              <MandarinText className="text-xs">
                <MandarinText className="text-xs underline">
                  파기 절차
                </MandarinText>
                <MandarinText className="text-xs">
                  {" "}
                  : 이용자의 대화 텍스트 데이터는 AI 분석 및 리포트 제공이
                  완료된 시점으로부터 최대 7일 이내에 복구 또는 재생 불가능한
                  방법으로 즉시 파기됩니다.
                </MandarinText>
              </MandarinText>
            </View>
            <View className="flex-row items-start gap-1">
              <MandarinText className="text-xs">2.</MandarinText>
              <MandarinText className="text-xs">
                <MandarinText className="text-xs underline">
                  파기 방법
                </MandarinText>
                <MandarinText className="text-xs">
                  {" "}
                  : 전자적 파일 형태의 정보는 기록을 재생할 수 없는 **기술적
                  방법(예: 로우레벨 포맷)**을 사용하여 삭제합니다.
                </MandarinText>
              </MandarinText>
            </View>
          </View>
          <View>
            <MandarinText className="text-base font-bold">
              4. 고지 의무
            </MandarinText>
            <MandarinText className="text-xs">
              현재 개인정보 처리 방침은 2025년 12월 03일부터 적용됩니다. 본
              방침의 내용 추가, 삭제 및 수정이 있을 경우 서비스 내 공지사항 또는
              이메일 등을 통해 최소 7일 전에 고지할 것입니다.
            </MandarinText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
