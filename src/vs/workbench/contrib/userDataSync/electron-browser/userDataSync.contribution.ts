/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IWorkbenchContributionsRegistry, Extensions as WorkbenchExtensions, IWorkbenchContribution } from 'vs/workbench/common/contributions';
import { ISettingsMergeService, IUserDataSyncUtilService } from 'vs/platform/userDataSync/common/userDataSync';
import { Registry } from 'vs/platform/registry/common/platform';
import { LifecyclePhase } from 'vs/platform/lifecycle/common/lifecycle';
import { ISharedProcessService } from 'vs/platform/ipc/electron-browser/sharedProcessService';
import { SettingsMergeChannel } from 'vs/platform/userDataSync/common/settingsSyncIpc';
import { UserDataSycnUtilServiceChannel } from 'vs/platform/userDataSync/common/keybindingsSyncIpc';

class UserDataSyncServicesContribution implements IWorkbenchContribution {

	constructor(
		@ISettingsMergeService settingsMergeService: ISettingsMergeService,
		@IUserDataSyncUtilService userDataSyncUtilService: IUserDataSyncUtilService,
		@ISharedProcessService sharedProcessService: ISharedProcessService,
	) {
		sharedProcessService.registerChannel('settingsMerge', new SettingsMergeChannel(settingsMergeService));
		sharedProcessService.registerChannel('userDataSyncUtil', new UserDataSycnUtilServiceChannel(userDataSyncUtilService));
	}
}

const workbenchRegistry = Registry.as<IWorkbenchContributionsRegistry>(WorkbenchExtensions.Workbench);
workbenchRegistry.registerWorkbenchContribution(UserDataSyncServicesContribution, LifecyclePhase.Starting);
