FOAM_FILES([
  // Payment
  { name: 'net/nanopay/tx/tp/TxnProcessor' },
  { name: 'net/nanopay/tx/tp/TxnProcessorData' },
  { name: 'net/nanopay/tx/tp/TxnProcessorUserReference' },
  { name: 'net/nanopay/payment/Institution' },
  { name: 'net/nanopay/payment/InstitutionPurposeCode' },
  { name: 'net/nanopay/account/Account' },
  { name: 'net/nanopay/account/Balance' },
  { name: 'net/nanopay/account/DigitalAccount' },
  { name: 'net/nanopay/account/DigitalAccountInfo' },
  { name: 'net/nanopay/account/DigitalAccountServiceInterface' },
  { name: 'net/nanopay/account/ClientDigitalAccountService' },
  { name: 'net/nanopay/tx/BalanceAdapterAccountDAO' },
  { name: 'net/nanopay/model/Branch' },
  { name: 'net/nanopay/bank/BankAccount' },
  { name: 'net/nanopay/bank/CABankAccount' },
  { name: 'net/nanopay/bank/BankAccountStatus' },
  { name: 'net/nanopay/model/Currency' },
  { name: 'net/nanopay/model/BusinessSector' },
  { name: 'net/nanopay/model/BusinessType' },
  { name: 'net/nanopay/model/PadAccount' },
  { name: 'net/nanopay/model/PadCapture' },
  { name: 'net/nanopay/model/DateAndPlaceOfBirth' },
  { name: 'net/nanopay/model/Identification' },
  { name: 'net/nanopay/model/Invitation' },
  { name: 'net/nanopay/model/InvitationStatus' },
  { name: 'net/nanopay/admin/model/ComplianceStatus' },
  { name: 'net/nanopay/admin/model/AccountStatus' },
  { name: 'net/nanopay/model/User' },
  { name: 'net/nanopay/model/AppConfig' },
  { name: 'net/nanopay/ui/wizard/WizardCssAxiom', flags: ['web'] },
  { name: 'net/nanopay/ui/wizard/WizardView', flags: ['web'] },
  { name: 'net/nanopay/auth/email/EmailTokenService' },
  { name: 'net/nanopay/auth/sms/PhoneVerificationTokenService', flags: ['web'] },
  { name: 'net/nanopay/auth/ui/SignUpView', flags: ['web'] },
  { name: 'net/nanopay/auth/ui/SignInView', flags: ['web'] },
  { name: 'net/nanopay/auth/ui/UserDetailView', flags: ['web'] },
  { name: 'net/nanopay/auth/ui/UserTableView', flags: ['web'] },
  { name: 'net/nanopay/ui/wizard/WizardOverview', flags: ['web'] },
  { name: 'net/nanopay/ui/wizard/WizardSubView', flags: ['web'] },
  { name: 'net/nanopay/ui/NotificationActionCard', flags: ['web'] },
  { name: 'net/nanopay/ui/ContentCard', flags: ['web'] },
  { name: 'net/nanopay/ui/BusinessCard', flags: ['web'] },
  { name: 'net/nanopay/ui/RadioView', flags: ['web'] },
  { name: 'net/nanopay/ui/ToggleSwitch', flags: ['web'] },
  { name: 'net/nanopay/ui/LoadingSpinner', flags: ['web'] },
  { name: 'net/nanopay/ui/PostalCodeFormat', flags: ['web'] },
  { name: 'net/nanopay/ui/BalanceView', flags: ['web'] },
  { name: 'net/nanopay/ui/ExpandContainer', flags: ['web'] },

  // onboarding
  { name: 'net/nanopay/onboarding/b2b/ui/B2BOnboardingWizard', flags: ['web'] },
  { name: 'net/nanopay/onboarding/b2b/ui/SaveAndLogOutModal', flags: ['web'] },
  { name: 'net/nanopay/onboarding/b2b/ui/BusinessProfileForm', flags: ['web'] },
  { name: 'net/nanopay/onboarding/b2b/ui/AddPrincipalOwnersForm', flags: ['web'] },
  { name: 'net/nanopay/onboarding/b2b/ui/QuestionnaireForm', flags: ['web'] },
  { name: 'net/nanopay/onboarding/b2b/ui/ConfirmAdminInfoForm', flags: ['web'] },
  { name: 'net/nanopay/onboarding/b2b/ui/NextStepView', flags: ['web'] },
  { name: 'net/nanopay/onboarding/b2b/ui/ProfileSubmittedForm', flags: ['web'] },
  { name: 'net/nanopay/onboarding/b2b/ui/ReviewAndSubmitForm', flags: ['web'] },
  { name: 'net/nanopay/onboarding/b2b/ui/UploadAdditionalDocumentsView', flags: ['web'] },
  { name: 'net/nanopay/onboarding/b2b/ui/ViewSubmittedProfileView', flags: ['web'] },
  { name: 'net/nanopay/onboarding/b2b/ui/ViewSubmittedRegistrationView', flags: ['web'] },
  { name: 'net/nanopay/onboarding/b2b/ui/AdditionalDocumentsUploadView', flags: ['web'] },
  { name: 'net/nanopay/onboarding/b2b/ui/PasswordChangeForm', flags: ['web'] },
  { name: 'net/nanopay/onboarding/model/Question' },
  { name: 'net/nanopay/onboarding/model/Questionnaire' },
  { name: 'net/nanopay/onboarding/InvitationTokenService' },
  { name: 'net/nanopay/onboarding/FirebaseInvitationTokenService' },

  // fx
  { name: 'net/nanopay/fx/ExchangeRateStatus' },
  { name: 'net/nanopay/fx/model/ExchangeRate' },
  { name: 'net/nanopay/fx/model/DeliveryTimeFields' },
  { name: 'net/nanopay/fx/model/ExchangeRateFields' },
  { name: 'net/nanopay/fx/model/FeesFields' },
  { name: 'net/nanopay/fx/model/ExchangeRateQuote' },
  { name: 'net/nanopay/fx/model/FixerIOExchangeRate' },
  { name: 'net/nanopay/fx/ExchangeRateInterface' },
  { name: 'net/nanopay/fx/client/ClientExchangeRateService' },

  // ascendant fx
  { name: 'net/nanopay/fx/ascendantfx/AscendantFX' },

  // interac
  { name: 'net/nanopay/fx/interac/model/PayoutOptions' },
  { name: 'net/nanopay/fx/interac/model/Corridor' },
  { name: 'net/nanopay/fx/interac/model/RequiredAccountFields' },
  { name: 'net/nanopay/fx/interac/model/RequiredAddressFields' },
  { name: 'net/nanopay/fx/interac/model/RequiredAgentFields' },
  { name: 'net/nanopay/fx/interac/model/RequiredDocumentFields' },
  { name: 'net/nanopay/fx/interac/model/RequiredIdentificationFields' },
  { name: 'net/nanopay/fx/interac/model/RequiredUserFields' },

  // lianlian pay
  { name: 'net/nanopay/fx/lianlianpay/LianLianPay' },
  { name: 'net/nanopay/fx/lianlianpay/model/ResultCode' },
  { name: 'net/nanopay/fx/lianlianpay/model/DistributionMode' },
  { name: 'net/nanopay/fx/lianlianpay/model/InstructionType' },
  { name: 'net/nanopay/fx/lianlianpay/model/CurrencyBalanceRecord' },
  { name: 'net/nanopay/fx/lianlianpay/model/InstructionCombined' },
  { name: 'net/nanopay/fx/lianlianpay/model/InstructionCombinedRequest' },
  { name: 'net/nanopay/fx/lianlianpay/model/InstructionCombinedSummary' },
  { name: 'net/nanopay/fx/lianlianpay/model/PreProcessResult' },
  { name: 'net/nanopay/fx/lianlianpay/model/PreProcessResultResponse' },
  { name: 'net/nanopay/fx/lianlianpay/model/PreProcessResultSummary' },
  { name: 'net/nanopay/fx/lianlianpay/model/Reconciliation' },
  { name: 'net/nanopay/fx/lianlianpay/model/ReconciliationRecord' },
  { name: 'net/nanopay/fx/lianlianpay/model/Statement' },
  { name: 'net/nanopay/fx/lianlianpay/model/StatementRecord' },

  // tx
  { name: 'net/nanopay/tx/client/ClientUserTransactionLimitService' },
  { name: 'net/nanopay/tx/model/CashOutFrequency' },
  { name: 'net/nanopay/tx/model/Fee' },
  { name: 'net/nanopay/tx/model/FeeInterface' },
  { name: 'net/nanopay/tx/model/FeeType' },
  { name: 'net/nanopay/tx/model/FixedFee' },
  { name: 'net/nanopay/tx/model/InformationalFee' },
  { name: 'net/nanopay/tx/model/LiquiditySettings' },
  { name: 'net/nanopay/tx/model/PercentageFee' },
  { name: 'net/nanopay/tx/model/TransactionStatus' },
  { name: 'net/nanopay/tx/model/TransactionEntity' },
  { name: 'net/nanopay/tx/TransactionType' },
  { name: 'net/nanopay/tx/model/Transaction' },
  { name: 'net/nanopay/tx/RefundTransaction' },
  { name: 'net/nanopay/tx/RetailTransaction' },
  { name: 'net/nanopay/tx/model/TransactionLimit' },
  { name: 'net/nanopay/tx/model/TransactionLimitTimeFrame' },
  { name: 'net/nanopay/tx/model/TransactionLimitType' },
  { name: 'net/nanopay/tx/TransactionPurpose' },
  { name: 'net/nanopay/tx/UserTransactionLimit' },
  { name: 'net/nanopay/tx/model/LiquidityAuth' },
  { name: 'net/nanopay/tx/CompositeTransactionDAO' },
  { name: 'net/nanopay/tx/CompositeTransaction' },

  // tx tests
  { name: 'net/nanopay/tx/model/TransactionParseTest' },

  { name: 'net/nanopay/model/Broker' },

  { name: 'net/nanopay/tx/ui/TransactionsView', flags: ['web'] },
  { name: 'net/nanopay/tx/ui/TransactionDetailView', flags: ['web'] },
  { name: 'net/nanopay/tx/ui/SingleItemView', flags: ['web'] },
  { name: 'net/nanopay/tx/ui/CurrencyChoice', flags: ['web'] },

  { name: 'net/nanopay/util/ChallengeGenerator' },

  // retail
  { name: 'net/nanopay/retail/model/DeviceType' },
  { name: 'net/nanopay/retail/model/DeviceStatus' },
  { name: 'net/nanopay/retail/model/Device' },

  { name: 'net/nanopay/retail/ui/devices/DeviceCTACard', flags: ['web'] },
  { name: 'net/nanopay/retail/ui/devices/DevicesView', flags: ['web'] },
  { name: 'net/nanopay/retail/ui/devices/ManageDeviceModal', flags: ['web'] },
  { name: 'net/nanopay/retail/ui/devices/form/DeviceForm', flags: ['web'] },
  { name: 'net/nanopay/retail/ui/devices/form/DeviceNameForm', flags: ['web'] },
  { name: 'net/nanopay/retail/ui/devices/form/DeviceTypeForm', flags: ['web'] },
  { name: 'net/nanopay/retail/ui/devices/form/DeviceSerialForm', flags: ['web'] },
  { name: 'net/nanopay/retail/ui/devices/form/DevicePasswordForm', flags: ['web'] },

  // admin
  { name: 'net/nanopay/admin/ui/AccountRevokedView', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/ActivateProfileModal', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/AddBusinessView', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/AddMerchantView', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/AddCompanyView', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/AddShopperView', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/DisableProfileModal', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/EditBusinessView', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/ResendInviteModal', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/ReviewProfileView', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/RevokeInviteModal', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/SendMoneyView', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/SubMenu', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/TransactionView', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/UserDetailView', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/UserItemView', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/UserView', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/ApiBrowser', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/OverviewView', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/SampleRequestView', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/form/merchant/AddMerchantForm', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/form/merchant/AddMerchantInfoForm', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/form/merchant/AddMerchantProfileForm', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/form/merchant/AddMerchantSendMoneyForm', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/form/merchant/AddMerchantReviewForm', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/form/shopper/AddShopperForm', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/form/shopper/AddShopperInfoForm', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/form/shopper/AddShopperSendMoneyForm', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/form/shopper/AddShopperReviewForm', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/form/company/AddCompanyForm', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/form/company/AddCompanyProfileForm', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/form/company/AddCompanyInfoForm', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/form/company/AddCompanyReviewForm', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/form/shared/AddUserDoneForm', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/history/UserHistoryItemView', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/history/UserHistoryView', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/history/AccountStatusHistoryItemView', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/history/ComplianceStatusHistoryItemView', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/history/DocumentStatusHistoryItemView', flags: ['web'] },
  { name: 'net/nanopay/admin/ui/history/InviteAttemptsHistoryItemView', flags: ['web'] },

  { name: 'net/nanopay/cico/model/EFTReturnFileCredentials' },
  { name: 'net/nanopay/cico/service/BankAccountVerifier' },
  { name: 'net/nanopay/cico/service/ClientBankAccountVerifierService' },
  { name: 'net/nanopay/cico/ui/bankAccount/AddBankView', flags: ['web'] },
  { name: 'net/nanopay/cico/ui/bankAccount/BankAccountsView', flags: ['web'] },
  { name: 'net/nanopay/cico/ui/bankAccount/BankCTACard', flags: ['web'] },
  { name: 'net/nanopay/cico/ui/bankAccount/form/BankCashoutForm', flags: ['web'] },
  { name: 'net/nanopay/cico/ui/bankAccount/form/BankDoneForm', flags: ['web'] },
  { name: 'net/nanopay/cico/ui/bankAccount/form/BankForm', flags: ['web'] },
  { name: 'net/nanopay/cico/ui/bankAccount/form/BankInfoForm', flags: ['web'] },
  { name: 'net/nanopay/cico/ui/bankAccount/form/BankPadAuthorization', flags: ['web'] },
  { name: 'net/nanopay/cico/ui/bankAccount/form/BankVerificationForm', flags: ['web'] },
  { name: 'net/nanopay/cico/ui/bankAccount/ManageAccountModal', flags: ['web'] },
  { name: 'net/nanopay/cico/ui/CicoView', flags: ['web'] },
  { name: 'net/nanopay/cico/ui/AlternaEFTDownload', flags: ['web'] },
  { name: 'net/nanopay/tx/tp/alterna/AlternaFormat' },
  { name: 'net/nanopay/tx/tp/alterna/SFTPService' },
  { name: 'net/nanopay/tx/tp/alterna/AlternaSFTPService' },
  { name: 'net/nanopay/tx/tp/alterna/client/ClientAlternaSFTPService' },
  { name: 'net/nanopay/tx/tp/alterna/AlternaTransaction' },
  { name: 'net/nanopay/tx/tp/realex/RealexTransaction' },

  { name: 'net/nanopay/cico/paymentCard/model/PaymentCardNetwork' },
  { name: 'net/nanopay/cico/paymentCard/model/PaymentCardType' },
  { name: 'net/nanopay/cico/paymentCard/model/PaymentCard' },
  { name: 'net/nanopay/cico/CICOPaymentType' },
  { name: 'net/nanopay/cico/model/PaymentAccountInfo' },
  { name: 'net/nanopay/cico/model/RealexPaymentAccountInfo' },
  { name: 'net/nanopay/cico/model/MobileWallet' },

  // invoice
  { name: 'net/nanopay/invoice/model/PaymentStatus' },
  { name: 'net/nanopay/invoice/model/Invoice' },
  { name: 'net/nanopay/invoice/model/RecurringInvoice' },
  { name: 'net/nanopay/invoice/ui/ExpensesView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/SalesView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/InvoiceDashboardView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/InvoiceSummaryView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/MentionsView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/SummaryCard', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/shared/ActionInterfaceButton', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/shared/SingleItemView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/shared/ForeignSingleItemView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/shared/SingleSubscriptionView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/InvoiceDetailView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/ExpensesDetailView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/SalesDetailView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/SubscriptionView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/SubscriptionEditView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/SubscriptionDetailView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/SubscriptionInvoiceView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/InvoiceFileView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/InvoiceFileUploadView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/history/InvoiceHistoryView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/history/InvoiceHistoryItemView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/history/InvoiceStatusHistoryItemView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/history/InvoiceReceivedHistoryItemView', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/history/InvoiceCreatedHistoryItemView', flags: ['web'] },
  { name: 'net/nanopay/invoice/notification/NewInvoiceNotification' },
  { name: 'net/nanopay/invoice/notification/NewInvoiceNotificationNotificationView', flags: ['web'] },
  { name: 'net/nanopay/invoice/notification/InvoicePaymentNotification' },
  { name: 'net/nanopay/invoice/notification/InvoicePaymentNotificationNotificationView', flags: ['web'] },

  // settings
  { name: 'net/nanopay/settings/autoCashout/AutoCashoutSettingsView', flags: ['web'] },
  { name: 'net/nanopay/settings/business/BusinessHoursView', flags: ['web'] },
  { name: 'net/nanopay/settings/business/EditPrincipalOwnersView', flags: ['web'] },
  { name: 'net/nanopay/settings/business/BusinessProfileView', flags: ['web'] },
  { name: 'net/nanopay/settings/business/PrincipalOwnersDetailView', flags: ['web'] },
  { name: 'net/nanopay/settings/business/EditBusinessView', flags: ['web'] },
  { name: 'net/nanopay/settings/business/EditBusinessProfileView', flags: ['web'] },
  { name: 'net/nanopay/settings/PersonalProfileView', flags: ['web'] },
  { name: 'net/nanopay/settings/MultiUserManagementView', flags: ['web'] },
  { name: 'net/nanopay/settings/IntegrationView', flags: ['web'] },

  // security
  { name: 'net/nanopay/security/EncryptedObject' },
  { name: 'net/nanopay/security/KeyStoreManager' },
  { name: 'net/nanopay/security/AbstractKeyStoreManager' },
  { name: 'net/nanopay/security/AbstractFileKeyStoreManager' },
  { name: 'net/nanopay/security/BKSKeyStoreManager' },
  { name: 'net/nanopay/security/JCEKSKeyStoreManager' },
  { name: 'net/nanopay/security/JKSKeyStoreManager' },
  { name: 'net/nanopay/security/PKCS11KeyStoreManager' },
  { name: 'net/nanopay/security/PKCS12KeyStoreManager' },
  { name: 'net/nanopay/security/csp/CSPViolation' },
  { name: 'net/nanopay/security/KeyPairEntry' },
  { name: 'net/nanopay/security/PublicKeyEntry' },
  { name: 'net/nanopay/security/PrivateKeyEntry' },
  { name: 'net/nanopay/security/KeyPairDAO' },
  { name: 'net/nanopay/security/PublicKeyDAO' },
  { name: 'net/nanopay/security/PrivateKeyDAO' },
  { name: 'net/nanopay/security/UserKeyPairGenerationDAO' },
  { name: 'net/nanopay/security/RandomNonceDAO' },

  // security tests
  { name: 'net/nanopay/security/HashedJSONParserTest' },
  { name: 'net/nanopay/security/HashingJournalTest' },
  { name: 'net/nanopay/security/HashingOutputterTest' },
  { name: 'net/nanopay/security/HashingWriterTest' },
  { name: 'net/nanopay/security/PKCS11KeyStoreManagerTest' },
  { name: 'net/nanopay/security/PKCS12KeyStoreManagerTest' },
  { name: 'net/nanopay/security/UserKeyPairGenerationDAOTest' },

  // style
  { name: 'net/nanopay/invoice/ui/styles/InvoiceStyles', flags: ['web'] },
  { name: 'net/nanopay/ui/modal/ModalStyling', flags: ['web'] },
  { name: 'net/nanopay/ui/modal/ExportModal', flags: ['web'] },
  { name: 'net/nanopay/ui/styles/AppStyles', flags: ['web'] },

  // history
  { name: 'net/nanopay/ui/history/InvoiceHistoryView', flags: ['web'] },
  { name: 'net/nanopay/ui/history/InvoiceHistoryItemView', flags: ['web'] },

  // modal
  { name: 'net/nanopay/invoice/ui/modal/DisputeModal', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/modal/ScheduleModal', flags: ['web'] },
  { name: 'net/nanopay/invoice/ui/modal/RecordPaymentModal', flags: ['web'] },
  { name: 'net/nanopay/ui/modal/EmailModal', flags: ['web'] },
  { name: 'net/nanopay/ui/modal/UploadModal', flags: ['web'] },
  { name: 'net/nanopay/ui/modal/ModalHeader', flags: ['web'] },
  { name: 'net/nanopay/ui/modal/TandCModal', flags: ['web'] },
  { name: 'net/nanopay/cico/ui/ci/ConfirmCashInModal', flags: ['web'] },
  { name: 'net/nanopay/cico/ui/co/ConfirmCashOutModal', flags: ['web'] },
  { name: 'net/nanopay/cico/ui/ci/CashInModal', flags: ['web'] },
  { name: 'net/nanopay/cico/ui/co/CashOutModal', flags: ['web'] },
  { name: 'net/nanopay/cico/ui/ci/CashInSuccessModal', flags: ['web'] },
  { name: 'net/nanopay/cico/ui/co/CashOutSuccessModal', flags: ['web'] },
  { name: 'net/nanopay/partners/ui/modal/PartnerInviteModal', flags: ['web'] },

  // util
  { name: 'net/nanopay/util/AddCommaFormatter' },
  { name: 'net/nanopay/util/FormValidation' },
  { name: 'net/nanopay/util/CurrencyFormatter' },
  { name: 'net/nanopay/util/Iso20022' },

  // transfer
  { name: 'net/nanopay/ui/transfer/TransferWizard', flags: ['web'] },
  { name: 'net/nanopay/ui/transfer/TransferReview', flags: ['web'] },
  { name: 'net/nanopay/ui/transfer/TransferDetails', flags: ['web'] },
  { name: 'net/nanopay/ui/transfer/TransferAmount', flags: ['web'] },
  { name: 'net/nanopay/ui/transfer/TransferComplete', flags: ['web'] },
  { name: 'net/nanopay/ui/transfer/TransferView', flags: ['web'] },
  { name: 'net/nanopay/ui/transfer/TransferUserCard', flags: ['web'] },
  { name: 'net/nanopay/ui/transfer/FixedFloatView', flags: ['web'] },

  // ui
  { name: 'net/nanopay/ui/topNavigation/BusinessLogoView', flags: ['web'] },
  { name: 'net/nanopay/ui/topNavigation/CurrencyChoiceView', flags: ['web'] },
  { name: 'net/nanopay/ui/topNavigation/NoMenuTopNav', flags: ['web'] },
  { name: 'net/nanopay/ui/topNavigation/SubMenuBar', flags: ['web'] },
  { name: 'net/nanopay/ui/topNavigation/TopNav', flags: ['web'] },
  { name: 'net/nanopay/ui/topNavigation/UserTopNavView', flags: ['web'] },
  { name: 'net/nanopay/ui/topNavigation/UserView', flags: ['web'] },
  { name: 'net/nanopay/ui/ActionButton', flags: ['web'] },
  { name: 'net/nanopay/ui/Placeholder', flags: ['web'] },
  { name: 'net/nanopay/ui/TransferView', flags: ['web'] },
  { name: 'net/nanopay/ui/CCTransferView', flags: ['web'] },
  { name: 'net/nanopay/ui/ActionView', flags: ['web'] },
  { name: 'net/nanopay/ui/Controller', flags: ['web'] },
  { name: 'net/nanopay/ui/CountdownView', flags: ['web'] },
  { name: 'net/nanopay/ui/AccountBalanceDashboard', flags: ['web'] },


  // partners
  { name: 'net/nanopay/partners/ui/PartnersView', flags: ['web'] },
  { name: 'net/nanopay/partners/ui/ContactCard', flags: ['web'] },
  { name: 'net/nanopay/partners/ui/ContactCardView', flags: ['web'] },
  { name: 'net/nanopay/partners/ui/PartnerInvitationNotification', flags: ['web'] },
  { name: 'net/nanopay/partners/ui/PartnerInvitationNotificationNotificationView', flags: ['web'] },
  { name: 'net/nanopay/auth/PublicUserInfo' },

  // relationships
  { name: 'net/nanopay/model/Relationships' },
  { name: 'net/nanopay/partners/UserUserJunctionRefinement' },

  // flinks
  { name: 'net/nanopay/flinks/FlinksAuth' },
  { name: 'net/nanopay/flinks/ClientFlinksAuthService' },

  // tests
  { name: 'net/nanopay/test/ModelledTest' },
  { name: 'net/nanopay/auth/PublicUserInfoDAOTest' },
  { name: 'net/nanopay/invoice/AuthenticatedInvoiceDAOTest' },
  { name: 'net/nanopay/test/TestsReporter' },
  { name: 'net/nanopay/test/TestReport' },
  { name: 'net/nanopay/tx/tp/alterna/test/EFTTest'}
]);
